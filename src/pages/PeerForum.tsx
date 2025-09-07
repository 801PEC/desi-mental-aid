import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Users, 
  MessageSquare, 
  Plus, 
  ThumbsUp, 
  Clock, 
  Shield,
  Eye,
  Search,
  Filter,
  AlertTriangle
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: Date;
  category: string;
  replies: number;
  likes: number;
  views: number;
  isAnonymous: boolean;
}

const PeerForum = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const categories = [
    { id: "all", name: "All Topics", color: "bg-gray-100 text-gray-800" },
    { id: "academic", name: "Academic Stress", color: "bg-blue-100 text-blue-800" },
    { id: "anxiety", name: "Anxiety & Worry", color: "bg-purple-100 text-purple-800" },
    { id: "relationships", name: "Relationships", color: "bg-pink-100 text-pink-800" },
    { id: "family", name: "Family Issues", color: "bg-green-100 text-green-800" },
    { id: "career", name: "Career Concerns", color: "bg-orange-100 text-orange-800" },
    { id: "general", name: "General Support", color: "bg-indigo-100 text-indigo-800" }
  ];

  const forumPosts: ForumPost[] = [
    {
      id: "1",
      title: "Feeling overwhelmed with final exams approaching",
      content: "Hi everyone, I'm in my final year and the pressure is really getting to me. Anyone else feeling this way? How are you coping?",
      author: "Anonymous Student",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      category: "Academic Stress",
      replies: 12,
      likes: 8,
      views: 45,
      isAnonymous: true
    },
    {
      id: "2", 
      title: "Managing anxiety during presentations",
      content: "I get really nervous during class presentations. My heart races and I can't think clearly. Any tips from fellow students?",
      author: "Anonymous Student",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      category: "Anxiety & Worry", 
      replies: 7,
      likes: 15,
      views: 62,
      isAnonymous: true
    },
    {
      id: "3",
      title: "Dealing with homesickness in hostel",
      content: "This is my first time away from home and I'm really missing my family. Some days I just want to pack up and go back. Is this normal?",
      author: "Anonymous Student",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      category: "Family Issues",
      replies: 23,
      likes: 19,
      views: 89,
      isAnonymous: true
    },
    {
      id: "4",
      title: "Finding motivation when everything feels pointless",
      content: "Lately I've been struggling to find meaning in my studies. Everything feels overwhelming and pointless. Anyone else going through this?",
      author: "Anonymous Student", 
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      category: "General Support",
      replies: 31,
      likes: 42,
      views: 156,
      isAnonymous: true
    }
  ];

  const handleCreatePost = () => {
    setIsCreatingPost(false);
    // Would normally submit to backend
    alert("Your post has been submitted and will appear shortly after moderation review.");
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const filteredPosts = forumPosts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === categories.find(c => c.id === selectedCategory)?.name;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <Users className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Peer Support Community</h1>
          </div>
          <p className="text-lg text-calm max-w-2xl mx-auto">
            A safe, anonymous space to connect with fellow students who understand your challenges. 
            Share experiences, offer support, and find solidarity in a moderated environment.
          </p>
        </div>

        {/* Community Guidelines */}
        <Alert className="mb-8 border-primary/50 bg-primary/5">
          <Shield className="h-4 w-4 text-primary" />
          <AlertDescription>
            <strong>Community Guidelines:</strong> This is a safe space for mutual support. All posts are anonymous and moderated. 
            Please be respectful, supportive, and remember that this community is here to help each other thrive.
          </AlertDescription>
        </Alert>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Dialog open={isCreatingPost} onOpenChange={setIsCreatingPost}>
            <DialogTrigger asChild>
              <Button className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                New Discussion
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Start a New Discussion</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Discussion Title</label>
                  <Input placeholder="What would you like to discuss?" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select className="w-full p-2 border border-border rounded-md bg-background">
                    <option value="">Select a category</option>
                    {categories.slice(1).map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Message</label>
                  <Textarea 
                    placeholder="Share your thoughts, experiences, or questions. Remember, this is a supportive community."
                    className="min-h-[120px]"
                  />
                </div>
                
                <Alert className="border-warning/50 bg-warning/5">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <AlertDescription className="text-xs">
                    All posts are anonymous and will be reviewed by moderators before appearing. 
                    Please follow community guidelines and be respectful.
                  </AlertDescription>
                </Alert>
                
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsCreatingPost(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreatePost}
                    className="btn-primary flex-1"
                  >
                    Post Anonymously
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : `${category.color} hover:scale-105`
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Forum Posts */}
        <div className="space-y-6">
          {filteredPosts.length === 0 ? (
            <Card className="card-gentle text-center py-12">
              <CardContent>
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No discussions found</h3>
                <p className="text-calm">
                  {searchQuery ? "Try adjusting your search terms" : "Be the first to start a discussion in this category!"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredPosts.map((post) => (
              <Card key={post.id} className="card-gentle hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {post.category}
                        </Badge>
                        {post.isAnonymous && (
                          <Badge variant="secondary" className="text-xs">
                            Anonymous
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg leading-tight hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-calm leading-relaxed line-clamp-2">
                    {post.content}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.replies}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{post.views}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{getTimeAgo(post.timestamp)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Moderation Notice */}
        <Card className="card-gentle mt-12 bg-gradient-to-r from-success/5 to-success/10">
          <CardContent className="pt-6 text-center">
            <Shield className="h-8 w-8 text-success mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Moderated Community</h3>
            <p className="text-sm text-calm">
              Our peer support forum is actively moderated by trained volunteers and mental health professionals 
              to ensure a safe, supportive environment for all students.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PeerForum;