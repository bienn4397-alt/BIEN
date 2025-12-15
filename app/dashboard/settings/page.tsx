"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  CreditCard, 
  Download, 
  Trash2, 
  Save,
  Moon,
  Sun,
  Monitor
} from "lucide-react"

export default function SettingsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "Gestionnaire de réseaux sociaux passionné",
    website: "https://monentreprise.com",
    location: "Paris, France"
  })
  
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyReport: true,
    mentions: true,
    newFollowers: true,
    postScheduled: true,
    postPublished: true
  })
  
  const [preferences, setPreferences] = useState({
    theme: "system",
    language: "fr",
    timezone: "Europe/Paris",
    dateFormat: "dd/mm/yyyy",
    currency: "EUR"
  })

  const handleSaveProfile = async () => {
    setIsLoading(true)
    // Simulation de sauvegarde
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été sauvegardées avec succès.",
    })
    setIsLoading(false)
  }

  const handleSaveNotifications = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast({
      title: "Préférences de notification mises à jour",
      description: "Vos paramètres de notification ont été sauvegardés.",
    })
    setIsLoading(false)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Paramètres</h1>
        <p className="text-muted-foreground">
          Gérez votre compte et vos préférences
        </p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Profil
          </CardTitle>
          <CardDescription>
            Vos informations personnelles et publiques
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              placeholder="Décrivez-vous en quelques mots..."
            />
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="website">Site web</Label>
              <Input
                id="website"
                value={profile.website}
                onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                placeholder="https://votre-site.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Localisation</Label>
              <Input
                id="location"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                placeholder="Ville, Pays"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleSaveProfile} disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Sauvegarde..." : "Sauvegarder"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Notifications
          </CardTitle>
          <CardDescription>
            Configurez comment vous souhaitez être notifié
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Notifications par email</Label>
                <p className="text-sm text-muted-foreground">
                  Recevoir les notifications importantes par email
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications.emailNotifications}
                onChange={(e) => setNotifications({ 
                  ...notifications, 
                  emailNotifications: e.target.checked 
                })}
                className="rounded border-gray-300"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Notifications push</Label>
                <p className="text-sm text-muted-foreground">
                  Recevoir des notifications push dans le navigateur
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications.pushNotifications}
                onChange={(e) => setNotifications({ 
                  ...notifications, 
                  pushNotifications: e.target.checked 
                })}
                className="rounded border-gray-300"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Rapport hebdomadaire</Label>
                <p className="text-sm text-muted-foreground">
                  Recevoir un résumé de vos performances chaque semaine
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications.weeklyReport}
                onChange={(e) => setNotifications({ 
                  ...notifications, 
                  weeklyReport: e.target.checked 
                })}
                className="rounded border-gray-300"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Mentions</Label>
                <p className="text-sm text-muted-foreground">
                  Être notifié quand quelqu'un vous mentionne
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications.mentions}
                onChange={(e) => setNotifications({ 
                  ...notifications, 
                  mentions: e.target.checked 
                })}
                className="rounded border-gray-300"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Nouveaux followers</Label>
                <p className="text-sm text-muted-foreground">
                  Être notifié de nouveaux followers
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications.newFollowers}
                onChange={(e) => setNotifications({ 
                  ...notifications, 
                  newFollowers: e.target.checked 
                })}
                className="rounded border-gray-300"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleSaveNotifications} disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Sauvegarde..." : "Sauvegarder"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Palette className="h-5 w-5 mr-2" />
            Apparence
          </CardTitle>
          <CardDescription>
            Personnalisez l'apparence de l'application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label>Thème</Label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setPreferences({ ...preferences, theme: "light" })}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  preferences.theme === "light" 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:bg-accent"
                }`}
              >
                <Sun className="h-5 w-5 mx-auto mb-2" />
                <span className="text-sm">Clair</span>
              </button>
              <button
                onClick={() => setPreferences({ ...preferences, theme: "dark" })}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  preferences.theme === "dark" 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:bg-accent"
                }`}
              >
                <Moon className="h-5 w-5 mx-auto mb-2" />
                <span className="text-sm">Sombre</span>
              </button>
              <button
                onClick={() => setPreferences({ ...preferences, theme: "system" })}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  preferences.theme === "system" 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:bg-accent"
                }`}
              >
                <Monitor className="h-5 w-5 mx-auto mb-2" />
                <span className="text-sm">Système</span>
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language & Region */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            Langue et Région
          </CardTitle>
          <CardDescription>
            Configurez la langue et les paramètres régionaux
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="language">Langue</Label>
              <select
                id="language"
                value={preferences.language}
                onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Fuseau horaire</Label>
              <select
                id="timezone"
                value={preferences.timezone}
                onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="Europe/Paris">Europe/Paris</option>
                <option value="Europe/London">Europe/London</option>
                <option value="America/New_York">America/New_York</option>
                <option value="Asia/Tokyo">Asia/Tokyo</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data & Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Données et Confidentialité
          </CardTitle>
          <CardDescription>
            Gérez vos données et paramètres de confidentialité
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Download className="h-4 w-4 mr-2" />
              Télécharger mes données
            </Button>
            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
              <Trash2 className="h-4 w-4 mr-2" />
              Supprimer mon compte
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
