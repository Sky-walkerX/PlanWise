"use client"

import { useState } from "react"
import { Music, ExternalLink, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Alert, AlertDescription } from "@/app/components/ui/alert"

interface SpotifyPlaylist {
  id: string
  name: string
  description: string
  embedUrl: string
  category: "focus" | "lofi" | "ambient" | "classical" | "nature"
}

export default function SpotifyWidget() {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>("focus-flow")
  const [showInfo, setShowInfo] = useState(false)

  // Curated focus playlists - these are real Spotify playlist IDs
  const focusPlaylists: SpotifyPlaylist[] = [
    {
      id: "focus-flow",
      name: "Deep Focus",
      description: "Keep calm and focus with ambient and post-rock music",
      embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DWZeKCadgRdKQ",
      category: "focus",
    },
    {
      id: "lofi-hip-hop",
      name: "Lofi Hip Hop",
      description: "Chill beats to help you focus and study",
      embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn",
      category: "lofi",
    },
    {
      id: "peaceful-piano",
      name: "Peaceful Piano",
      description: "Relax and indulge with beautiful piano pieces",
      embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO",
      category: "classical",
    },
    {
      id: "ambient-chill",
      name: "Ambient Chill",
      description: "Ambient music for deep work and concentration",
      embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DX3Ogo9pFvBkY",
      category: "ambient",
    },
    {
      id: "brain-food",
      name: "Brain Food",
      description: "Instrumental study music to help you concentrate",
      embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DWXLeA8Omikj7",
      category: "focus",
    },
    {
      id: "nature-sounds",
      name: "Nature Sounds",
      description: "Relaxing nature sounds for focus and meditation",
      embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DX8ymr6UES7vc",
      category: "nature",
    },
  ]

  const currentPlaylist = focusPlaylists.find((p) => p.id === selectedPlaylist) || focusPlaylists[0]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "focus":
        return "bg-blue-100 text-blue-800"
      case "lofi":
        return "bg-purple-100 text-purple-800"
      case "classical":
        return "bg-amber-100 text-amber-800"
      case "ambient":
        return "bg-teal-100 text-teal-800"
      case "nature":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="h-full bg-[var(--primarybg)] dark:bg-[var(--primarybgdark)] border-[var(--secondarybg)]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)] flex items-center gap-2">
            <Music className="w-5 h-5 text-green-500" />
            Focus Music
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowInfo(!showInfo)}
              className="text-[var(--mutedbg)] hover:text-[var(--accent2bg)] hover:bg-[var(--secondarybg)] p-1"
            >
              <Info className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-[var(--mutedbg)] hover:text-[var(--accent2bg)] hover:bg-[var(--secondarybg)] p-1"
            >
              <a
                href={currentPlaylist.embedUrl.replace("/embed/", "/").replace("?utm_source=generator", "")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Info Alert */}
        {showInfo && (
          <Alert className="border-green-200 bg-green-50">
            <Info className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 text-sm">
              <strong>Spotify Premium:</strong> Full track playback and no ads
              <br />
              <strong>Free Account:</strong> 30-second previews with ads
            </AlertDescription>
          </Alert>
        )}

        {/* Playlist Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)]">
            Choose your focus playlist:
          </label>
          <Select value={selectedPlaylist} onValueChange={setSelectedPlaylist}>
            <SelectTrigger className="border-[var(--secondarybg)] bg-[var(--secondarybg)] text-[var(--accent2bg)]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[var(--primarybg)] border-[var(--secondarybg)]">
              {focusPlaylists.map((playlist) => (
                <SelectItem
                  key={playlist.id}
                  value={playlist.id}
                  className="text-[var(--accent2bg)] focus:bg-[var(--secondarybg)]"
                >
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(playlist.category)}`}>
                      {playlist.category}
                    </span>
                    {playlist.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Current Playlist Info */}
        <div className="p-3 rounded-lg bg-[var(--secondarybg)] dark:bg-[var(--secondarybgdark)]">
          <div className="flex items-center gap-2 mb-2">
            <Music className="w-4 h-4 text-green-500" />
            <h4 className="font-medium text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)]">
              {currentPlaylist.name}
            </h4>
            <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(currentPlaylist.category)}`}>
              {currentPlaylist.category}
            </span>
          </div>
          <p className="text-sm text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]">{currentPlaylist.description}</p>
        </div>

        {/* Spotify Embed Player */}
        <div className="relative">
          <div className="rounded-lg overflow-hidden border-2 border-[var(--secondarybg)] dark:border-[var(--secondarybgdark)]">
            <iframe
              src={`${currentPlaylist.embedUrl}?utm_source=generator&theme=0`}
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-lg"
              title={`Spotify playlist: ${currentPlaylist.name}`}
            />
          </div>

          {/* Overlay for better integration */}
          <div className="absolute top-2 right-2 bg-black/20 backdrop-blur-sm rounded-full p-1">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <Music className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex-1 border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
          >
            <a href="https://open.spotify.com/premium" target="_blank" rel="noopener noreferrer">
              Get Premium
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex-1 border-[var(--secondarybg)] text-[var(--accent2bg)] hover:bg-[var(--secondarybg)] bg-transparent"
          >
            <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer">
              Open Spotify
            </a>
          </Button>
        </div>

        {/* Pro Tip */}
        <div className="text-xs text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)] text-center p-2 bg-[var(--secondarybg)]/50 rounded-lg">
          💡 <strong>Pro tip:</strong> Click the external link icon to open in Spotify app for better controls
        </div>
      </CardContent>
    </Card>
  )
}
