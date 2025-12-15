"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Plus, 
  Settings, 
  RefreshCw, 
  ExternalLink, 
  CheckCircle, 
  AlertCircle,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Users,
  TrendingUp,
  Eye
} from "lucide-react"

interface SocialAccount {
  id: string
  platform: string
  displayName: string
  username: string
  profileImage?: string
  isConnected: boolean
  followers: number
  status: "connected" | "disconnected" | "error"
  lastSync?: string
  avatar?: string
}

const mockAccounts: SocialAccount[] = [
  {
    id: "1",
    platform: "Facebook",
    displayName: "Mon Entreprise",
    username: "monentreprise",
    followers: 8432,
    isConnected: true,
    status: "connected",
    lastSync: "2024-01-15T10:30:00Z",
    avatar: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "2",
    platform: "Instagram",
    displayName: "@monentreprise",
    username: "monentreprise",
    followers: 5621,
    isConnected: true,
    status: "connected",
    lastSync: "2024-01-15T10:25:00Z",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "3",
    platform: "Twitter",
    displayName: "Mon Entreprise",
    username: "@monentreprise",
    followers: 1876,
    isConnected: false,
    status: "disconnected",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "4",
    platform: "LinkedIn",
    displayName: "Mon Entreprise",
    username: "mon-entreprise",
    followers: 3247,
    isConnected: true,
    status: "connected",
    lastSync: "2024-01-15T10:20:00Z",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "5",
    platform: "YouTube",
    displayName: "Mon Entreprise",
    username: "monentreprise",
    followers: 987,
    isConnected: false,
    status: "disconnected",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  }
]

const platformIcons = {
  Facebook: Facebook,
  Instagram: Instagram,
  Twitter: Twitter,
  Linkedin: Linkedin,
  YouTube: Youtube
}

const platformColors = {
  Facebook: "bg-blue-600",
  Instagram: "bg-gradient-to-r from-purple-500 to-pink-500",
  Twitter: "bg-blue-400",
  Linkedin: "bg-blue-700",
  YouTube: "bg-red-600"
}

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<SocialAccount[]>(mockAccounts)

  const getStatusIcon = (status: SocialAccount["status"]) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "disconnected":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusText = (status: SocialAccount["status"]) => {
    switch (status) {
      case "connected":
        return "Connecté"
      case "disconnected":
        return "Déconnecté"
      case "error":
        return "Erreur"
      default:
        return "Inconnu"
    }
  }

  const connectedAccounts = accounts.filter(acc => acc.isConnected)
  const totalFollowers = connectedAccounts.reduce((sum, acc) => sum + acc.followers, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Comptes Réseaux Sociaux</h1>
          <p className="text-muted-foreground">
            Gérez la connexion à vos différents comptes de réseaux sociaux
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un Compte
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comptes Connectés</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{connectedAccounts.length}</div>
            <p className="text-xs text-muted-foreground">
              sur {accounts.length} comptes totaux
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Followers Total</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFollowers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              sur tous les comptes connectés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Plateformes</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Object.keys(platformIcons).length}</div>
            <p className="text-xs text-muted-foreground">
              plateformes supportées
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Accounts List */}
      <div className="grid gap-6 md:grid-cols-2">
        {accounts.map((account) => {
          const IconComponent = platformIcons[account.platform as keyof typeof platformIcons] || Facebook
          const colorClass = platformColors[account.platform as keyof typeof platformColors] || "bg-gray-500"
          
          return (
            <Card key={account.id}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg ${colorClass} flex items-center justify-center`}>
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{account.displayName}</CardTitle>
                      <CardDescription>{account.username}</CardDescription>
                    </div>
                  </div>
                  {getStatusIcon(account.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Status */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Statut:</span>
                  <span className={`text-sm font-medium ${
                    account.status === "connected" ? "text-green-600" : 
                    account.status === "disconnected" ? "text-red-600" : "text-orange-600"
                  }`}>
                    {getStatusText(account.status)}
                  </span>
                </div>

                {/* Followers */}
                {account.isConnected && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Followers:</span>
                    <span className="text-sm font-medium">{account.followers.toLocaleString()}</span>
                  </div>
                )}

                {/* Last Sync */}
                {account.lastSync && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Dernière sync:</span>
                    <span className="text-sm">
                      {new Date(account.lastSync).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center space-x-2 pt-4 border-t">
                  {account.isConnected ? (
                    <>
                      <Button variant="outline" size="sm" className="flex-1">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Synchroniser
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" className="flex-1">
                      <Plus className="h-4 w-4 mr-2" />
                      Connecter
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Connection Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Comment Connecter vos Comptes</CardTitle>
          <CardDescription>
            Instructions pour connecter vos comptes de réseaux sociaux
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-600 rounded text-white flex items-center justify-center text-xs font-bold">1</div>
                <span className="font-medium">Cliquez sur "Connecter"</span>
              </div>
              <p className="text-sm text-muted-foreground ml-8">
                Cliquez sur le bouton "Connecter" pour la plateforme de votre choix
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-600 rounded text-white flex items-center justify-center text-xs font-bold">2</div>
                <span className="font-medium">Autorisez l'accès</span>
              </div>
              <p className="text-sm text-muted-foreground ml-8">
                Connectez-vous à votre compte et autorisez SocialHub à accéder à vos données
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-600 rounded text-white flex items-center justify-center text-xs font-bold">3</div>
                <span className="font-medium">Synchronisation</span>
              </div>
              <p className="text-sm text-muted-foreground ml-8">
                Une fois connecté, vos données commenceront à être synchronisées automatiquement
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            Sécurité et Confidentialité
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Vos informations de connexion sont sécurisées et jamais stockées en clair</p>
            <p>• Nous accédons uniquement aux données nécessaires pour les fonctionnalités de l'application</p>
            <p>• Vous pouvez déconnecter vos comptes à tout moment depuis cette page</p>
            <p>• Aucune publication n'est effectuée sans votre autorisation explicite</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
