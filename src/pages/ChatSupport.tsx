import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send, Bot, User, AlertTriangle, Heart } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatSupport = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm here to provide you with emotional first-aid support. I'm a trained AI companion designed to listen and help guide you through difficult moments. Please remember that while I can offer support and resources, I'm not a replacement for professional counseling. How are you feeling today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string) => {
    const responses = [
      "I hear that you're going through a difficult time. Your feelings are completely valid. Can you tell me more about what's been weighing on your mind?",
      "Thank you for sharing that with me. It takes courage to reach out. What you're experiencing sounds really challenging. Have you been able to talk to anyone else about this?",
      "I'm glad you felt comfortable sharing this with me. What you're going through is more common than you might think, and there are ways to work through it. What usually helps you feel a bit better when you're stressed?",
      "That sounds really overwhelming. You're taking a positive step by reaching out for support. Sometimes it helps to take things one day at a time. What's one small thing that might help you feel more grounded right now?",
      "I can sense the strength it took to share this. Your mental health matters, and you deserve support. Would it be helpful if I shared some resources or coping strategies that other students have found useful?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(inputMessage),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <Heart className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">AI Emotional First-Aid</h1>
          </div>
          <p className="text-lg text-calm max-w-2xl mx-auto">
            A safe space to share your feelings and receive immediate emotional support. 
            Our AI companion is here to listen and help guide you through difficult moments.
          </p>
        </div>

        {/* Important Notice */}
        <Alert className="mb-6 border-warning/50 bg-warning/5">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <AlertDescription className="text-sm">
            <strong>Important:</strong> This AI provides emotional first-aid support and is not a replacement for professional counseling. 
            If you're experiencing a mental health crisis, please contact emergency services or a crisis helpline immediately.
          </AlertDescription>
        </Alert>

        {/* Chat Interface */}
        <Card className="card-gentle">
          <CardHeader className="border-b border-border/50">
            <CardTitle className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-primary" />
              <span>Support Chat</span>
              <span className="text-sm font-normal text-muted-foreground">
                • Available 24/7 • Confidential
              </span>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.isUser 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary text-secondary-foreground'
                    }`}>
                      {message.isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    
                    <div className={`rounded-lg p-3 ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary/50 text-secondary-foreground'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className={`text-xs mt-1 opacity-70`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-secondary/50 text-secondary-foreground rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-border/50 p-4">
              <div className="flex space-x-2">
                <Textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share what's on your mind... Press Enter to send, Shift+Enter for new line"
                  className="min-h-[60px] resize-none"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="btn-primary"
                  size="lg"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground mt-2">
                Remember: This is a safe, confidential space. Take your time and share only what feels comfortable.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Resource Links */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-calm">
            Need additional support? You can also:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline" className="btn-secondary">
              <a href="/booking">Book a Counseling Session</a>
            </Button>
            <Button asChild variant="outline" className="btn-secondary">
              <a href="/resources">Browse Self-Help Resources</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSupport;