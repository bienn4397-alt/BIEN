"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Plus, 
  Calendar as CalendarIcon, 
  Clock, 
  Edit, 
  Trash2, 
  Eye,
  CheckCircle,
  AlertCircle
} from "lucide-react"

interface ScheduledPost {
  id: string
  content: string
  scheduledAt: string
  platforms: string[]
  status: "scheduled" | "published" | "failed"
  mediaCount: number
}

const mockScheduledPosts: ScheduledPost[] = [
  {
    id: "1",
    content: "Bonne année 2024 ! 🎉",
    scheduledAt: "2024-01-16T09:00:00Z",
    platforms: ["Facebook", "Instagram", "Twitter"],
    status: "scheduled",
    mediaCount: 1
  },
  {
    id: "2",
    content: "Découvrez notre nouveau blog post sur les tendances du marketing digital 📊",
    scheduledAt: "2024-01-17T14:30:00Z",
    platforms: ["LinkedIn"],
    status: "scheduled",
    mediaCount: 0
  },
  {
    id: "3",
    content: "Behind the scenes de notre équipe 💻",
    scheduledAt: "2024-01-18T10:00:00Z",
    platforms: ["Instagram", "Facebook"],
    status: "scheduled",
    mediaCount: 3
  },
  {
    id: "4",
    content: "Webinaire gratuit : Stratégies de croissance sur les réseaux sociaux",
    scheduledAt: "2024-01-19T16:00:00Z",
    platforms: ["LinkedIn", "Facebook"],
    status: "scheduled",
    mediaCount: 2
  }
]

export default function SchedulePage() {
  const [posts, setPosts] = useState<ScheduledPost[]>(mockScheduledPosts)

  const getStatusIcon = (status: ScheduledPost["status"]) => {
    switch (status) {
      case "scheduled":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "published":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusText = (status: ScheduledPost["status"]) => {
    switch (status) {
      case "scheduled":
        return "Programmé"
      case "published":
        return "Publié"
      case "failed":
        return "Échec"
      default:
        return "Inconnu"
    }
  }

  const formatScheduledDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const isToday = date.toDateString() === now.toDateString()
    const isTomorrow = date.toDateString() === new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString()
    
    let dateText = ""
    if (isToday) {
      dateText = "Aujourd'hui"
    } else if (isTomorrow) {
      dateText = "Demain"
    } else {
      dateText = date.toLocaleDateString('fr-FR', { 
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      })
    }
    
    const time = date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
    
    return `${dateText} à ${time}`
  }

  const upcomingPosts = posts.filter(post => post.status === "scheduled")
  const todayPosts = posts.filter(post => {
    const postDate = new Date(post.scheduledAt)
    const today = new Date()
    return postDate.toDateString() === today.toDateString() && post.status === "scheduled"
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Planification</h1>
          <p className="text-muted-foreground">
            Gérez vos publications programmées et planifiez votre contenu
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Planifier une Publication
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Publications Aujourd'hui</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayPosts.length}</div>
            <p className="text-xs text-muted-foreground">
              Programmé pour aujourd'hui
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Publications à Venir</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingPosts.length}</div>
            <p className="text-xs text-muted-foreground">
              Total programmé
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ce Semaine</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingPosts.length}</div>
            <p className="text-xs text-muted-foreground">
              Publications planifiées
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Calendar View Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Calendrier de Publication</CardTitle>
          <CardDescription>
            Vue calendrier de vos publications programmées
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-border rounded-lg">
            <div className="text-center">
              <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Calendrier Interactif</h3>
              <p className="text-muted-foreground mb-4">
                Visualisez toutes vos publications programmées sur un calendrier
              </p>
              <Button variant="outline">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Ouvrir le Calendrier
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Posts List */}
      <Card>
        <CardHeader>
          <CardTitle>Publications Programmées</CardTitle>
          <CardDescription>
            Vos prochaines publications à publier automatiquement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingPosts.map((post) => (
              <div key={post.id} className="flex items-start space-x-4 p-4 rounded-lg border border-border">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(post.status)}
                      <span className="text-sm font-medium">
                        {getStatusText(post.status)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-sm">{post.content}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        {formatScheduledDate(post.scheduledAt)}
                      </span>
                      {post.mediaCount > 0 && (
                        <span>{post.mediaCount} média{post.mediaCount > 1 ? 's' : ''}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {post.platforms.map((platform) => (
                        <span
                          key={platform}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {upcomingPosts.length === 0 && (
            <div className="text-center py-8">
              <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Aucune publication programmée</h3>
              <p className="text-muted-foreground mb-4">
                Commencez par planifier votre première publication
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Planifier une Publication
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions Rapides</CardTitle>
          <CardDescription>
            Actions fréquentes pour la planification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Plus className="h-6 w-6" />
              <span>Nouvelle Publication</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <CalendarIcon className="h-6 w-6" />
              <span>Calendrier</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Clock className="h-6 w-6" />
              <span>Planification en Masse</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Edit className="h-6 w-6" />
              <span>Modifier Planning</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
