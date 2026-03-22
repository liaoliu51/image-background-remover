'use client'

import { useState, useRef } from 'react'
import { Upload, Download, Trash2, Image as ImageIcon, Sparkles, AlertCircle, Settings } from 'lucide-react'

interface ProcessedImage {
  original: string
  processed: string | null
  name: string
  status: 'pending' | 'processing' | 'completed' | 'error'
  error?: string
}

export default function Home() {
  const [apiKey, setApiKey] = useState<string>('')
  const [showApiKeyInput, setShowApiKeyInput] = useState(false)
  const [images, setImages] = useState<ProcessedImage[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load API key from localStorage on mount
  useState(() => {
    if (typeof window !== 'undefined') {
      const savedKey = localStorage.getItem('removebg_api_key')
      if (savedKey) setApiKey(savedKey)
    }
  })

  const saveApiKey = (key: string) => {
    setApiKey(key)
    localStorage.setItem('removebg_api_key', key)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (files: FileList) => {
    const newImages: ProcessedImage[] = Array.from(files)
      .filter(file => file.type.startsWith('image/'))
      .map(file => ({
        original: URL.createObjectURL(file),
        processed: null,
        name: file.name,
        status: 'pending' as const,
      }))

    setImages(prev => [...prev, ...newImages])
  }

  const processImage = async (index: number) => {
    if (!apiKey) {
      setImages(prev => prev.map((img, i) => 
        i === index 
          ? { ...img, status: 'error', error: 'Please configure your Remove.bg API Key first' }
          : img
      ))
      setShowApiKeyInput(true)
      return
    }

    setImages(prev => prev.map((img, i) => 
      i === index ? { ...img, status: 'processing' } : img
    ))

    try {
      const image = images[index]
      const blob = await fetch(image.original).then(r => r.blob())
      
      const formData = new FormData()
      formData.append('image_file', blob, image.name)
      formData.append('size', 'auto')

      const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': apiKey,
        },
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.errors?.[0]?.title || 'Failed to process image')
      }

      const processedBlob = await response.blob()
      const processedUrl = URL.createObjectURL(processedBlob)

      setImages(prev => prev.map((img, i) => 
        i === index 
          ? { ...img, processed: processedUrl, status: 'completed' }
          : img
      ))
    } catch (error) {
      setImages(prev => prev.map((img, i) => 
        i === index 
          ? { 
              ...img, 
              status: 'error', 
              error: error instanceof Error ? error.message : 'Failed to process image' 
            }
          : img
      ))
    }
  }

  const processAll = async () => {
    const pendingImages = images.filter(img => img.status === 'pending')
    if (pendingImages.length === 0) return

    setIsProcessing(true)
    for (let i = 0; i < images.length; i++) {
      if (images[i].status === 'pending') {
        await processImage(i)
      }
    }
    setIsProcessing(false)
  }

  const removeImage = (index: number) => {
    setImages(prev => {
      const newImages = [...prev]
      URL.revokeObjectURL(newImages[index].original)
      if (newImages[index].processed) {
        URL.revokeObjectURL(newImages[index].processed)
      }
      newImages.splice(index, 1)
      return newImages
    })
  }

  const downloadImage = (image: ProcessedImage) => {
    if (!image.processed) return
    
    const link = document.createElement('a')
    link.href = image.processed
    link.download = image.name.replace(/\.[^/.]+$/, '') + '_no_bg.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const clearAll = () => {
    images.forEach(img => {
      URL.revokeObjectURL(img.original)
      if (img.processed) URL.revokeObjectURL(img.processed)
    })
    setImages([])
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Image Background Remover</h1>
                <p className="text-sm text-gray-600">Remove backgrounds instantly with AI</p>
              </div>
            </div>
            <button
              onClick={() => setShowApiKeyInput(!showApiKeyInput)}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span className="hidden sm:inline">API Settings</span>
            </button>
          </div>
        </div>
      </header>

      {/* API Key Configuration */}
      {showApiKeyInput && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Remove.bg API Configuration</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
                  API Key
                </label>
                <input
                  type="password"
                  id="apiKey"
                  value={apiKey}
                  onChange={(e) => saveApiKey(e.target.value)}
                  placeholder="Enter your Remove.bg API Key"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <p className="text-sm text-gray-600">
                Get your free API key at{' '}
                <a
                  href="https://www.remove.bg/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  remove.bg/api
                </a>
                {' '} (50 free images/month)
              </p>
              <button
                onClick={() => setShowApiKeyInput(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 bg-white hover:border-blue-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Drag & drop images here
          </h3>
          <p className="text-gray-600 mb-4">or click to select files</p>
          <p className="text-sm text-gray-500">
            Supports: JPG, PNG, WebP (Max 5MB per image)
          </p>
        </div>

        {/* Action Buttons */}
        {images.length > 0 && (
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={clearAll}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5" />
              <span>Clear All</span>
            </button>
            <button
              onClick={processAll}
              disabled={isProcessing || !images.some(img => img.status === 'pending')}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
            >
              <Sparkles className="w-5 h-5" />
              <span>{isProcessing ? 'Processing...' : 'Remove All Backgrounds'}</span>
            </button>
          </div>
        )}

        {/* Image Grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {images.map((image, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Image Preview */}
                <div className="relative aspect-square bg-gray-100">
                  {image.status === 'processing' ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                  ) : image.processed ? (
                    <div className="relative w-full h-full">
                      {/* Before/After comparison */}
                      <div className="absolute inset-0 grid grid-cols-2">
                        <div className="border-r border-gray-300 overflow-hidden">
                          <img
                            src={image.original}
                            alt="Original"
                            className="w-full h-full object-cover"
                          />
                          <div className="text-xs text-center bg-black bg-opacity-50 text-white py-1">
                            Original
                          </div>
                        </div>
                        <div className="overflow-hidden" style={{
                          backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
                          backgroundSize: '20px 20px',
                          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                        }}>
                          <img
                            src={image.processed}
                            alt="Processed"
                            className="w-full h-full object-cover"
                          />
                          <div className="text-xs text-center bg-black bg-opacity-50 text-white py-1">
                            No Background
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={image.original}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Status Badge */}
                  {image.status === 'error' && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>Error</span>
                    </div>
                  )}
                  {image.status === 'completed' && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                      Done
                    </div>
                  )}
                </div>

                {/* Image Info & Actions */}
                <div className="p-4">
                  <p className="text-sm font-medium text-gray-900 truncate mb-3">
                    {image.name}
                  </p>
                  
                  {image.error && (
                    <p className="text-xs text-red-600 mb-3">{image.error}</p>
                  )}

                  <div className="flex space-x-2">
                    {image.status !== 'completed' && (
                      <button
                        onClick={() => processImage(index)}
                        disabled={image.status === 'processing'}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                      >
                        {image.status === 'processing' ? 'Processing...' : 'Remove Background'}
                      </button>
                    )}
                    {image.processed && (
                      <button
                        onClick={() => downloadImage(image)}
                        className="flex-1 flex items-center justify-center space-x-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    )}
                    <button
                      onClick={() => removeImage(index)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Features Section */}
        {images.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered</h3>
              <p className="text-gray-600">
                Advanced AI automatically detects and removes backgrounds with high precision
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Download</h3>
              <p className="text-gray-600">
                Get your transparent PNG images immediately, ready to use anywhere
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Batch Processing</h3>
              <p className="text-gray-600">
                Upload and process multiple images at once to save time
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600 text-sm">
            Powered by Remove.bg API • Images are processed in your browser and not stored on any server
          </p>
        </div>
      </footer>
    </main>
  )
}
