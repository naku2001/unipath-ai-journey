import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your AI assistant for U.S. university applications. I can help you with deadlines, application processes, visa requirements, test preparations, financial aid, and more. What would you like to know?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const quickQuestions = [
    "What are the deadlines for Fall 2026 applications?",
    "How do I apply for an F-1 visa?",
    "What TOEFL score do I need?",
    "Tell me about financial aid for international students",
    "How do I write a compelling essay?",
  ];

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Simulate AI response - in real implementation, this would call your Supabase edge function
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(input),
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes("deadline") || lowerQuestion.includes("when")) {
      return "For Fall 2026 applications:\n\n• Early Decision/Action: November 1-15, 2025\n• Regular Decision: January 1-15, 2026\n• Rolling Admissions: Varies by school\n\nI recommend applying early to increase your chances and secure housing. Would you like specific deadlines for particular universities?";
    }
    
    if (lowerQuestion.includes("visa") || lowerQuestion.includes("f-1") || lowerQuestion.includes("f1")) {
      return "For F-1 visa application:\n\n1. Get accepted to a SEVP-approved school\n2. Receive I-20 form from your university\n3. Pay SEVIS I-901 fee ($350)\n4. Complete DS-160 online application\n5. Schedule visa interview at U.S. embassy/consulate\n6. Attend interview with required documents\n\nProcessing time: 2-8 weeks. Start early! Do you need help with any specific step?";
    }
    
    if (lowerQuestion.includes("toefl") || lowerQuestion.includes("ielts") || lowerQuestion.includes("test")) {
      return "English proficiency requirements:\n\n**TOEFL iBT:**\n• Top universities: 100+ (Harvard, MIT, Stanford)\n• Good universities: 80-100\n• Most universities: 60-80\n\n**IELTS:**\n• Top universities: 7.0+\n• Good universities: 6.5-7.0\n• Most universities: 6.0-6.5\n\nSome schools also accept Duolingo English Test (105-130). Would you like test prep resources?";
    }
    
    if (lowerQuestion.includes("financial aid") || lowerQuestion.includes("money") || lowerQuestion.includes("scholarship")) {
      return "Financial aid options for international students:\n\n**Merit-based scholarships:**\n• University-specific scholarships\n• Academic excellence awards\n• Talent-based scholarships\n\n**Need-based aid:**\n• Limited at most schools\n• Some schools are need-blind for internationals\n\n**External scholarships:**\n• Fulbright Program\n• Country-specific scholarships\n• Private organizations\n\nTip: Apply to schools known for generous aid to internationals. Need specific recommendations?";
    }
    
    if (lowerQuestion.includes("essay") || lowerQuestion.includes("personal statement")) {
      return "Essay writing tips:\n\n**Common App Personal Statement:**\n• Choose a meaningful topic\n• Show growth and reflection\n• Be specific with examples\n• 650 words max\n\n**Supplemental Essays:**\n• Research each school thoroughly\n• Address 'Why this school?'\n• Connect your goals to their programs\n\n**Structure:**\n1. Hook opening\n2. Personal story/experience\n3. Lessons learned\n4. Future impact\n\nWould you like help brainstorming essay topics?";
    }
    
    return "I'd be happy to help you with that! I specialize in U.S. university applications and can assist with:\n\n• Application deadlines and processes\n• Visa requirements (F-1, I-20, SEVIS)\n• Test requirements (TOEFL, IELTS, SAT, GRE)\n• Financial aid and scholarships\n• Essay writing and personal statements\n• University selection and research\n\nCould you be more specific about what you'd like to know? Or try one of the quick questions below!";
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-card">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">AI Assistant</h1>
            <p className="text-lg text-muted-foreground">
              Get expert guidance on your U.S. university application journey
            </p>
          </div>

          <Card className="shadow-medium">
            <CardHeader className="bg-gradient-primary text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-6 h-6" />
                UniPath AI Assistant
                <Sparkles className="w-4 h-4 ml-auto" />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-96 p-6">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex gap-3 max-w-[80%] ${
                          message.role === "user" ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            message.role === "user"
                              ? "bg-primary text-white"
                              : "bg-secondary text-white"
                          }`}
                        >
                          {message.role === "user" ? (
                            <User className="w-4 h-4" />
                          ) : (
                            <Bot className="w-4 h-4" />
                          )}
                        </div>
                        <div
                          className={`rounded-lg p-4 ${
                            message.role === "user"
                              ? "bg-primary text-white"
                              : "bg-muted"
                          }`}
                        >
                          <pre className="whitespace-pre-wrap font-sans text-sm">
                            {message.content}
                          </pre>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-muted rounded-lg p-4">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Quick Questions */}
              <div className="p-4 border-t bg-muted/50">
                <p className="text-sm font-medium mb-3">Quick Questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickQuestion(question)}
                      className="text-xs h-8"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about deadlines, visas, tests, essays, and more..."
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || !input.trim()}
                    size="icon"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;