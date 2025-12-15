"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  Heart, 
  Share, 
  Calendar,
  Download,
  Filter
} from "lucide-react"

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d")
  
  const stats = {
    reach: { value: 45678, change: 12.5, trend: "up" },
    engagements: { value: 3241, change: 8.3, trend: "up" },
    followers: { value: 12847, change: 15.2, trend: "up" },
    impressions: { value: 89234, change: -2.1, trend: "down" }
  }

  const topPosts = [
    {
      id: 1,
      content: "Découvrez nos nouvelles fonctionnalités ! 🚀",
      reach: 12340,
      engagements: 567,
      platform: "Facebook",
      date: "2024-01-15"
    },
    {
      id: 2,
      content: "Partage d'un article sur les tendances 2024 📈",
      reach: 8920,
      engagements: 423,
      platform: "LinkedIn",
      date: "2024-01-14"
    },
    {
      id: 3,
      content: "Behind the scenes de notre équipe 🎬",
      reach: 15420,
      engagements: 689,
      platform: "Instagram",
      date: "2024-01-14"
    }
  ]

  const platformStats = [
    { name: "Facebook", followers: 8432, reach: 23450, engagements: 1456, color: "bg-blue-500" },
    { name: "Instagram", followers: 5621, reach: 18920, engagements: 2134, color: "bg-pink-500" },
    { name: "LinkedIn", followers: 3247, reach: 8930, engagements: 567, color: "bg-blue-700" },
    { name: "Twitter", followers: 1876, reach: 12450, engagements: 342, color: "bg-blue-400" }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">
            Suivez les performances de vos publications et l'engagement de votre audience
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-input bg-background rounded-md text-sm"
          >
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">90 derniers jours</option>
            <option value="1y">1 an</option>
          </select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portée Totale</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.reach.value.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {stats.reach.trend === "up" ? (
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              )}
              <span className={stats.reach.trend === "up" ? "text-green-500" : "text-red-500"}>
                {stats.reach.change > 0 ? "+" : ""}{stats.reach.change}%
              </span>
              <span className="ml-1">vs période précédente</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagements</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.engagements.value.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {stats.engagements.trend === "up" ? (
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              )}
              <span className={stats.engagements.trend === "up" ? "text-green-500" : "text-red-500"}>
                {stats.engagements.change > 0 ? "+" : ""}{stats.engagements.change}%
              </span>
              <span className="ml-1">vs période précédente</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nouveaux Followers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.followers.value.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {stats.followers.trend === "up" ? (
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              )}
              <span className={stats.followers.trend === "up" ? "text-green-500" : "text-red-500"}>
                {stats.followers.change > 0 ? "+" : ""}{stats.followers.change}%
              </span>
              <span className="ml-1">vs période précédente</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impressions</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.impressions.value.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {stats.impressions.trend === "up" ? (
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              )}
              <span className={stats.impressions.trend === "up" ? "text-green-500" : "text-red-500"}>
                {stats.impressions.change > 0 ? "+" : ""}{stats.impressions.change}%
              </span>
              <span className="ml-1">vs période précédente</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Platform Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Performance par Plateforme</CardTitle>
            <CardDescription>
              Comparaison des métriques par réseau social
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {platformStats.map((platform) => (
                <div key={platform.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${platform.color}`} />
                      <span className="font-medium">{platform.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {platform.followers.toLocaleString()} followers
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Portée</div>
                      <div className="font-medium">{platform.reach.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Engagements</div>
                      <div className="font-medium">{platform.engagements.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Publications les Plus Performantes</CardTitle>
            <CardDescription>
              Vos publications qui ont généré le plus d'engagement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPosts.map((post) => (
                <div key={post.id} className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm line-clamp-2">{post.content}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{post.platform}</span>
                        <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Portée:</span>
                      <span className="font-medium">{post.reach.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Engagements:</span>
                      <span className="font-medium">{post.engagements}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Évolution des Performances</CardTitle>
          <CardDescription>
            Suivi de l'évolution de vos métriques dans le temps
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-border rounded-lg">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Graphiques Interactifs</h3>
              <p className="text-muted-foreground mb-4">
                Cette section affichera des graphiques détaillés de vos performances
              </p>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Configurer les Graphiques
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
