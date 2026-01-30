import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiFilter, FiExternalLink, FiCalendar, FiBookOpen, FiAward } from 'react-icons/fi'
import { SectionHeader, AnimatedCounter } from '../components/UIComponents'

// Fallback data if fetch fails
const fallbackPublications = [
  {
    id: 1,
    title: 'CWD30: A Multi-Crop Weed Dataset for Robust Weed Segmentation',
    authors: 'T. Ilyas, et al.',
    venue: 'IEEE Transactions on Image Processing',
    year: 2024,
    citations: 45,
    category: 'journal',
    link: '#',
  },
  {
    id: 2,
    title: 'DIANA: A Deep Learning Framework for Paprika Disease Detection',
    authors: 'T. Ilyas, et al.',
    venue: 'Computers and Electronics in Agriculture',
    year: 2023,
    citations: 32,
    category: 'journal',
    link: '#',
  },
  {
    id: 3,
    title: 'Domain Adaptation for Agricultural Vision Systems',
    authors: 'T. Ilyas, et al.',
    venue: 'CVPR Workshop',
    year: 2023,
    citations: 18,
    category: 'conference',
    link: '#',
  },
]

const categories = [
  { id: 'all', label: 'All', icon: FiBookOpen },
  { id: 'journal', label: 'Journals', icon: FiAward },
  { id: 'conference', label: 'Conferences', icon: FiCalendar },
  { id: 'preprint', label: 'Preprints', icon: FiExternalLink },
]

export default function Publications() {
  const [publications, setPublications] = useState([])
  const [stats, setStats] = useState({ citations: 0, h_index: 0, i10_index: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('year')

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await fetch('/profile/data/publications.json')
        if (response.ok) {
          const data = await response.json()
          setPublications(data.publications || [])
          setStats(data.stats || { citations: 0, h_index: 0, i10_index: 0 })
        } else {
          throw new Error('Failed to fetch')
        }
      } catch (err) {
        console.warn('Using fallback publication data:', err)
        setPublications(fallbackPublications)
        setStats({ citations: 1500, h_index: 20, i10_index: 15 })
        setError('Using cached data')
      } finally {
        setLoading(false)
      }
    }

    fetchPublications()
  }, [])

  // Filter and sort publications
  const filteredPublications = publications
    .filter((pub) => {
      const matchesCategory = activeCategory === 'all' || pub.category === activeCategory
      const matchesSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           pub.authors?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           pub.venue?.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      if (sortBy === 'year') return (b.year || 0) - (a.year || 0)
      if (sortBy === 'citations') return (b.citations || 0) - (a.citations || 0)
      return 0
    })

  const getCategoryColor = (category) => {
    switch (category) {
      case 'journal': return 'holo-green'
      case 'conference': return 'holo-cyan'
      case 'preprint': return 'holo-purple'
      default: return 'gray-400'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Publications"
          subtitle="// Scholar-Sync: Auto-updated from Google Scholar"
          align="center"
        />

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mb-12"
        >
          {[
            { label: 'Total Citations', value: stats.citations, color: 'green' },
            { label: 'h-index', value: stats.h_index, color: 'cyan' },
            { label: 'i10-index', value: stats.i10_index, color: 'purple' },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`p-4 rounded-xl border border-holo-${stat.color}/30 bg-cyber-800/30 backdrop-blur-sm text-center`}
            >
              <div className={`text-3xl font-display font-bold text-holo-${stat.color}`}>
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-sm font-mono text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search publications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-cyber-600 bg-cyber-800/50 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-holo-green transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-3 rounded-lg text-sm font-mono transition-all flex items-center space-x-2 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-holo-green to-holo-cyan text-cyber-900'
                    : 'border border-cyber-600 text-gray-400 hover:text-gray-200 hover:border-holo-green/50'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 rounded-lg border border-cyber-600 bg-cyber-800/50 text-gray-200 focus:outline-none focus:border-holo-green"
          >
            <option value="year">Sort by Year</option>
            <option value="citations">Sort by Citations</option>
          </select>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-holo-green border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Publications List */}
        {!loading && (
          <div className="space-y-4">
            <AnimatePresence>
              {filteredPublications.map((pub, index) => (
                <motion.article
                  key={pub.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative p-6 rounded-xl border border-cyber-600 bg-cyber-800/30 backdrop-blur-sm hover:border-holo-green/50 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {/* Year Badge */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl border border-cyber-600 bg-cyber-900/50 flex flex-col items-center justify-center">
                        <span className="text-2xl font-display font-bold text-holo-green">
                          {pub.year || 'N/A'}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          {/* Category Badge */}
                          <span className={`inline-block px-2 py-1 text-xs font-mono rounded border border-${getCategoryColor(pub.category)}/30 text-${getCategoryColor(pub.category)} mb-2`}>
                            {pub.category || 'other'}
                          </span>

                          {/* Title */}
                          <h3 className="font-semibold text-lg text-gray-100 mb-2 group-hover:text-holo-green transition-colors line-clamp-2">
                            {pub.title}
                          </h3>

                          {/* Authors */}
                          <p className="text-sm text-gray-400 mb-1 line-clamp-1">
                            {pub.authors}
                          </p>

                          {/* Venue */}
                          <p className="text-sm text-gray-500 font-mono line-clamp-1">
                            {pub.venue}
                          </p>
                        </div>

                        {/* Citations */}
                        <div className="flex-shrink-0 text-right">
                          <div className="text-2xl font-display font-bold text-holo-cyan">
                            {pub.citations || 0}
                          </div>
                          <div className="text-xs font-mono text-gray-500">citations</div>
                        </div>
                      </div>

                      {/* Link */}
                      {pub.link && (
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 mt-4 text-sm text-holo-cyan hover:text-holo-green transition-colors"
                        >
                          <FiExternalLink className="w-4 h-4" />
                          <span>View Publication</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>

            {/* Empty State */}
            {filteredPublications.length === 0 && !loading && (
              <div className="text-center py-20">
                <FiSearch className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500">No publications found matching your criteria.</p>
              </div>
            )}
          </div>
        )}

        {/* Scholar Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="https://scholar.google.com/citations?user=HYNOyyAAAAAJ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg border border-cyber-600 text-gray-400 hover:text-holo-cyan hover:border-holo-cyan transition-all"
          >
            <FiExternalLink className="w-5 h-5" />
            <span>View Full Profile on Google Scholar</span>
          </a>
        </motion.div>
      </div>
    </motion.div>
  )
}
