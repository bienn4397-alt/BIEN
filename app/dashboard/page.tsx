"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, TrendingUp, Users, Eye, Heart, MessageCircle } from "lucide-react"
import type { DashboardStats } from "@/types"

const mockStats: DashboardStats = {
  totalPosts: 156,
  totalFollowers: 12847,
  totalReach: 89432,
  totalEngagements: 3421,
  recentPosts: 8,
  growthRate: 12.5
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>(mockStats)

  const statCards = [
    {
      title: "Publications Total",
      value: stats.totalPosts.toLocaleString(),
      description: "+12 ce mois",
      icon: TrendingUp,
      color: "text-blue-600"
    },
    {
      title: "Followers Total",
      value: stats.totalFollowers.toLocaleString(),
      description: `+${stats.growthRate}% ce mois`,
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Portée",
      value: stats.totalReach.toLocaleString(),
      description: "30 derniers jours",
      icon: Eye,
      color: "text-purple-600"
    },
    {
      title: "Engagements",
      value: stats.totalEngagements.toLocaleString(),
      description: "30 derniers jours",
      icon: Heart,
      color: "text-red-600"
    }
  ]

  const recentPosts = [
    {
      id: 1,
      content: "Découvrez nos nouvelles fonctionnalités ! 🚀 #Innovation",
      platform: "Facebook",
      reach: 2340,
      engagements: 156,
      scheduledAt: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      content: "Partage d'un article sur les tendances 2024 📈",
      platform: "LinkedIn",
      reach: 1890,
      engagements: 92,
      scheduledAt: "2024-01-14T15:20:00Z"
    },
    {
      id: 3,
      content: "Behind the scenes de notre équipe 🎬",
      platform: "Instagram",
      reach: 3156,
      engagements: 284,
      scheduledAt: "2024-01-14T12:00:00Z"
    }
  ]

  const upcomingPosts = [
    {
      id: 4,
      content: "Annonce importante demain ! Stay tuned 👀",
      scheduledAt: "2024-01-16T09:00:00Z",
      platforms: ["Facebook", "LinkedIn"]
    },
    {
      id: 5,
      content: "Flashback Friday - nos meilleurs moments !",
      scheduledAt: "2024-01-17T08:00:00Z",
      platforms: ["Instagram", "Twitter"]
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Vue d'ensemble de votre activité sur les réseaux sociaux
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Publication
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Publications Récentes</CardTitle>
            <CardDescription>
              Vos dernières publications et leurs performances
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-start space-x-4 p-4 rounded-lg bg-muted/50">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{post.platform}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(post.scheduledAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <p className="text-sm">{post.content}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {post.reach.toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <Heart className="h-3 w-3 mr-1" />
                        {post.engagements}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Publications à Venir</CardTitle>
            <CardDescription>
              Vos publications programmées
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingPosts.map((post) => (
                <div key={post.id} className="flex items-start space-x-4 p-4 rounded-lg bg-muted/50">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {new Date(post.scheduledAt).toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className="text-sm">{post.content}</p>
                    <div className="flex items-center space-x-2">
                      {post.platforms.map((platform) => (
                        <span
                          key={platform}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions Rapides</CardTitle>
          <CardDescription>
            Actions fréquentes pour gérer vos réseaux sociaux
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Plus className="h-6 w-6" />
              <span>Nouvelle Publication</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <MessageCircle className="h-6 w-6" />
              <span>Voir les Commentaires</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <TrendingUp className="h-6 w-6" />
              <span>Voir les Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
