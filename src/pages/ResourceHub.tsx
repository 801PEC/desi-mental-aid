import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Video, 
  Headphones, 
  Download,
  Search,
  Clock,
  Star,
  Play,
  FileText,
  Heart
} from "lucide-react";

const ResourceHub = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const resourceCategories = [
    {
      id: "anxiety",
      name: "Anxiety & Stress",
      color: "bg-blue-100 text-blue-800",
      count: 24
    },
    {
      id: "depression", 
      name: "Depression & Mood",
      color: "bg-purple-100 text-purple-800",
      count: 18
    },
    {
      id: "academic",
      name: "Academic Pressure",
      color: "bg-green-100 text-green-800", 
      count: 32
    },
    {
      id: "relationships",
      name: "Relationships",
      color: "bg-pink-100 text-pink-800",
      count: 16
    },
    {
      id: "sleep",
      name: "Sleep & Wellness",
      color: "bg-indigo-100 text-indigo-800",
      count: 12
    },
    {
      id: "self-care",
      name: "Self-Care",
      color: "bg-orange-100 text-orange-800",
      count: 28
    }
  ];

  const articles = [
    {
      title: "Understanding Academic Anxiety: A Student's Guide",
      description: "Learn practical strategies to manage exam stress and academic pressure in a healthy way.",
      category: "Academic Pressure",
      readTime: "8 min read",
      rating: 4.8,
      type: "article"
    },
    {
      title: "5-Minute Breathing Exercises for Instant Calm", 
      description: "Simple breathing techniques you can use anywhere to reduce anxiety and stress.",
      category: "Anxiety & Stress",
      readTime: "5 min read",
      rating: 4.9,
      type: "article"
    },
    {
      title: "Building Healthy Sleep Habits in College",
      description: "Evidence-based tips for improving sleep quality despite demanding academic schedules.",
      category: "Sleep & Wellness", 
      readTime: "12 min read",
      rating: 4.7,
      type: "article"
    }
  ];

  const videos = [
    {
      title: "Progressive Muscle Relaxation Guided Session",
      description: "A 15-minute guided session to help you release physical tension and mental stress.",
      category: "Anxiety & Stress",
      duration: "15:30",
      rating: 4.9,
      type: "video"
    },
    {
      title: "Mindfulness for Students: Finding Balance",
      description: "Learn mindfulness techniques specifically designed for busy student life.",
      category: "Self-Care",
      duration: "22:45", 
      rating: 4.8,
      type: "video"
    },
    {
      title: "Dealing with Perfectionism in Academics",
      description: "Understand perfectionism and learn healthier approaches to academic achievement.",
      category: "Academic Pressure",
      duration: "18:20",
      rating: 4.6,
      type: "video"
    }
  ];

  const audioResources = [
    {
      title: "Guided Meditation for Better Sleep",
      description: "A calming 20-minute meditation to help you unwind and prepare for restful sleep.",
      category: "Sleep & Wellness",
      duration: "20:00",
      rating: 4.9,
      type: "audio"
    },
    {
      title: "Confidence Building Affirmations",
      description: "Daily affirmations to boost self-esteem and academic confidence.",
      category: "Self-Care", 
      duration: "12:30",
      rating: 4.7,
      type: "audio"
    },
    {
      title: "Anxiety Relief Nature Sounds",
      description: "Soothing nature sounds for stress relief and focus during study sessions.",
      category: "Anxiety & Stress",
      duration: "45:00",
      rating: 4.8,
      type: "audio"
    }
  ];

  const ResourceCard = ({ resource, icon: Icon }: { resource: any, icon: any }) => (
    <Card className="card-gentle group hover:scale-105 transition-all duration-300">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <Badge variant="outline" className="text-xs">
              {resource.category}
            </Badge>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium">{resource.rating}</span>
          </div>
        </div>
        <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-calm text-sm leading-relaxed">{resource.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{resource.readTime || resource.duration}</span>
          </div>
          
          <Button size="sm" className="btn-primary">
            {resource.type === 'article' ? 'Read' : resource.type === 'video' ? 'Watch' : 'Listen'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-warning to-warning/80 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-warning-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Psychoeducational Resource Hub</h1>
          </div>
          <p className="text-lg text-calm max-w-2xl mx-auto">
            Evidence-based resources, tools, and content to support your mental health journey. 
            All materials are curated by licensed professionals and designed specifically for students.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {resourceCategories.map((category) => (
            <Card key={category.id} className="card-gentle text-center cursor-pointer hover:scale-105 transition-all duration-300">
              <CardContent className="pt-4 pb-4">
                <Badge className={`${category.color} mb-2`}>
                  {category.count}
                </Badge>
                <p className="font-medium text-sm">{category.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Resource Tabs */}
        <Tabs defaultValue="articles" className="space-y-6">
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="articles" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Articles</span>
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center space-x-2">
                <Video className="h-4 w-4" />
                <span>Videos</span>
              </TabsTrigger>
              <TabsTrigger value="audio" className="flex items-center space-x-2">
                <Headphones className="h-4 w-4" />
                <span>Audio</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="articles" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Educational Articles</h2>
              <Badge variant="outline">{articles.length} articles</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <ResourceCard key={index} resource={article} icon={FileText} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Guided Videos</h2>
              <Badge variant="outline">{videos.length} videos</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <ResourceCard key={index} resource={video} icon={Play} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="audio" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Audio Resources</h2>
              <Badge variant="outline">{audioResources.length} recordings</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {audioResources.map((audio, index) => (
                <ResourceCard key={index} resource={audio} icon={Headphones} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Featured Resource */}
        <Card className="card-gentle mt-12 bg-gradient-to-r from-primary/5 to-primary-glow/5">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-primary" />
              <CardTitle>Featured Resource</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-xl font-semibold">Student Mental Health Toolkit</h3>
            <p className="text-calm">
              A comprehensive guide covering essential mental health topics for students, including stress management, 
              healthy relationships, and academic balance. This evidence-based resource is developed specifically 
              for the Indian student context.
            </p>
            <div className="flex items-center space-x-4">
              <Badge>Comprehensive Guide</Badge>
              <Badge variant="outline">45 min read</Badge>
              <Badge variant="outline">PDF Available</Badge>
            </div>
            <div className="flex space-x-3">
              <Button className="btn-primary">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" className="btn-secondary">
                Read Online
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResourceHub;