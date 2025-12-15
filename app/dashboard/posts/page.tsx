"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share, 
  MoreHorizontal,
  Image,
  Video,
  Link2
} from "lucide-react"

type PostStatus = "published" | "scheduled" | "draft"

interface Post {
  id: string
  content: string
  status: PostStatus
  scheduledAt?: string
  publishedAt?: string
  platforms: string[]
  mediaCount: number
  reach: number
  engagements: number
  likes: number
  comments: number
  shares: number
}

const mockPosts: Post[] = [
  {
    id: "1",
    content: "Découvrez nos nouvelles fonctionnalités révolutionnaire ! 🚀 #Innovation #Tech",
    status: "published",
    publishedAt: "2024-01-15T10:30:00Z",
    platforms: ["Facebook", "LinkedIn", "Twitter"],
    mediaCount: 2,
    reach: 3456,
    engagements: 234,
    likes: 189,
    comments: 32,
    shares: 13
  },
  {
    id: "2",
    content: "Flashback Friday - nos meilleurs moments de cette année ! 📸",
    status: "scheduled",
    scheduledAt: "2024-01-16T09:00:00Z",
    platforms: ["Instagram", "Facebook"],
    mediaCount: 4,
    reach: 0,
    engagements: 0,
    likes: 0,
    comments: 0,
    shares: 0
  },
  {
    id: "3",
    content: "Guide complet pour optimiser votre présence sur les réseaux sociaux...",
    status: "draft",
    platforms: ["LinkedIn"],
    mediaCount: 1,
    reach: 0,
    engagements: 0,
    likes: 0,
    comments: 0,
    shares: 0
  },
  {
    id: "4",
    content: "Merci à tous nos followers pour votre soutien ! 🙏 #Community",
    status: "published",
    publishedAt: "2024-01-14T15:20:00Z",
    platforms: ["Twitter", "Instagram"],
    mediaCount: 0,
    reach: 2134,
    engagements: 156,
    likes: 134,
    comments: 18,
    shares: 4
  }
]

const getStatusBadge = (status: PostStatus) => {
  const badges = {
    published: { label: "Publié", className: "bg-green-100 text-green-800" },
    scheduled: { label: "Programmé", className: "bg-blue-100 text-blue-800" },
    draft: { label: "Brouillon", className: "bg-gray-100 text-gray-800" }
  }
  const badge = badges[status]
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.className}`}>
      {badge.label}
    </span>
  )
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<PostStatus | "all">("all")

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || post.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const formatDate = (dateString?: string) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Publications</h1>
          <p className="text-muted-foreground">
            Gérez toutes vos publications sur les réseaux sociaux
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Publication
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Rechercher dans vos publications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filtres
        </Button>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as PostStatus | "all")}
          className="px-3 py-2 border border-input bg-background rounded-md text-sm"
        >
          <option value="all">Tous les statuts</option>
          <option value="published">Publiés</option>
          <option value="scheduled">Programmés</option>
          <option value="draft">Brouillons</option>
        </select>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusBadge(post.status)}
                    {post.scheduledAt && (
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Programmé pour {formatDate(post.scheduledAt)}
                      </span>
                    )}
                    {post.publishedAt && (
                      <span className="text-sm text-muted-foreground">
                        Publié le {formatDate(post.publishedAt)}
                      </span>
                    )}
                  </div>
                  <CardDescription className="text-base">
                    {post.content}
                  </CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {/* Platforms */}
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-sm text-muted-foreground">Plateformes:</span>
                {post.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {platform}
                  </span>
                ))}
                {post.mediaCount > 0 && (
                  <span className="text-sm text-muted-foreground flex items-center ml-2">
                    <Image className="h-3 w-3 mr-1" />
                    {post.mediaCount} média{post.mediaCount > 1 ? 's' : ''}
                  </span>
                )}
              </div>

              {/* Analytics */}
              {post.status === "published" && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{post.reach.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground flex items-center justify-center">
                      <Eye className="h-3 w-3 mr-1" />
                      Portée
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{post.engagements}</div>
                    <div className="text-xs text-muted-foreground flex items-center justify-center">
                      <Heart className="h-3 w-3 mr-1" />
                      Engagements
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{post.likes}</div>
                    <div className="text-xs text-muted-foreground">Likes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{post.comments}</div>
                    <div className="text-xs text-muted-foreground flex items-center justify-center">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Commentaires
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{post.shares}</div>
                    <div className="text-xs text-muted-foreground flex items-center justify-center">
                      <Share className="h-3 w-3 mr-1" />
                      Partages
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end space-x-2 pt-4">
                <Button variant="outline" size="sm">
                  Modifier
                </Button>
                {post.status === "draft" && (
                  <Button size="sm">
                    Publier
                  </Button>
                )}
                {post.status === "scheduled" && (
                  <Button variant="outline" size="sm">
                    Publier Maintenant
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-muted-foreground mb-4">
              <Plus className="h-12 w-12" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Aucune publication trouvée</h3>
            <p className="text-muted-foreground text-center mb-4">
              {searchTerm || filterStatus !== "all" 
                ? "Aucune publication ne correspond à vos critères de recherche."
                : "Commencez par créer votre première publication."
              }
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Créer une Publication
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
