import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Shield, User, Phone, Mail, Lock, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const BookingSystem = () => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [bookingStep, setBookingStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    academicYear: "",
    preferredDate: "",
    timeSlot: "",
    sessionType: "",
    concerns: "",
    counselorId: ""
  });

  const timeSlots = [
    { time: "9:00 AM", available: true },
    { time: "10:00 AM", available: false },
    { time: "11:00 AM", available: true },
    { time: "2:00 PM", available: true },
    { time: "3:00 PM", available: true },
    { time: "4:00 PM", available: false },
    { time: "5:00 PM", available: true },
  ];

  const counselors = [
    {
      id: "1",
      name: "Dr. Priya Sharma",
      speciality: "Anxiety & Stress Management",
      experience: "8 years",
      languages: ["Hindi", "English"],
      available: true
    },
    {
      id: "2", 
      name: "Dr. Rajesh Kumar",
      speciality: "Academic Pressure & Performance",
      experience: "12 years",
      languages: ["Hindi", "English", "Tamil"],
      available: true
    },
    {
      id: "3",
      name: "Dr. Meera Patel",
      speciality: "Depression & Mood Disorders",
      experience: "6 years", 
      languages: ["Hindi", "English", "Gujarati"],
      available: false
    }
  ];

  const handleBooking = async () => {
    if (!selectedTimeSlot || !formData.name || !formData.email || !formData.college || !formData.academicYear || !formData.preferredDate || !formData.sessionType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Save booking to database
      const { data: booking, error: dbError } = await supabase
        .from('bookings')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          college: formData.college,
          academic_year: formData.academicYear,
          preferred_date: formData.preferredDate,
          time_slot: selectedTimeSlot,
          session_type: formData.sessionType,
          concerns: formData.concerns || null,
          counselor_id: formData.counselorId || null,
          status: 'pending'
        })
        .select()
        .single();

      if (dbError) {
        console.error('Database error:', dbError);
        throw new Error('Failed to save booking');
      }

      // Send confirmation email
      const { error: emailError } = await supabase.functions.invoke('send-booking-confirmation', {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          college: formData.college,
          academicYear: formData.academicYear,
          preferredDate: formData.preferredDate,
          timeSlot: selectedTimeSlot,
          sessionType: formData.sessionType,
          concerns: formData.concerns,
          bookingId: booking.id
        }
      });

      if (emailError) {
        console.error('Email error:', emailError);
        // Don't throw error for email failure, booking is still saved
        toast({
          title: "Booking Confirmed!",
          description: "Your session has been booked successfully. There was an issue sending the confirmation email, but your booking is saved.",
          variant: "default",
        });
      } else {
        toast({
          title: "Booking Confirmed!",
          description: "Your session has been booked and a confirmation email has been sent.",
          variant: "default",
        });
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        college: "",
        academicYear: "",
        preferredDate: "",
        timeSlot: "",
        sessionType: "",
        concerns: "",
        counselorId: ""
      });
      setSelectedTimeSlot("");
      setBookingStep(1);

    } catch (error: any) {
      console.error('Booking error:', error);
      toast({
        title: "Booking Failed",
        description: error.message || "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-success to-success/80 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-success-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Confidential Counseling Sessions</h1>
          </div>
          <p className="text-lg text-calm max-w-2xl mx-auto">
            Book a private, one-on-one session with our licensed mental health professionals. 
            All sessions are completely confidential and conducted in a safe, judgment-free environment.
          </p>
        </div>

        {/* Privacy Assurance */}
        <Alert className="mb-8 border-success/50 bg-success/5">
          <Shield className="h-4 w-4 text-success" />
          <AlertDescription>
            <strong>Your Privacy is Protected:</strong> All sessions are encrypted, confidential, and follow strict privacy protocols. 
            Your personal information is never shared without your explicit consent.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available Counselors */}
          <Card className="card-gentle">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <span>Available Counselors</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {counselors.map((counselor) => (
                <div
                  key={counselor.id}
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    counselor.available 
                      ? 'border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer' 
                      : 'border-muted bg-muted/30 opacity-60'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-foreground">{counselor.name}</h3>
                    <Badge variant={counselor.available ? "default" : "secondary"}>
                      {counselor.available ? "Available" : "Busy"}
                    </Badge>
                  </div>
                  <p className="text-sm text-primary font-medium mb-1">{counselor.speciality}</p>
                  <p className="text-sm text-calm mb-2">{counselor.experience} experience</p>
                  <div className="flex flex-wrap gap-1">
                    {counselor.languages.map((lang) => (
                      <Badge key={lang} variant="outline" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Booking Form */}
          <Card className="card-gentle">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-success" />
                <span>Book Your Session</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {bookingStep === 1 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your.email@college.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="college">College/Institution</Label>
                    <Input 
                      id="college" 
                      placeholder="Your college name"
                      value={formData.college}
                      onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year">Academic Year</Label>
                    <Select value={formData.academicYear} onValueChange={(value) => setFormData({ ...formData, academicYear: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1st">1st Year</SelectItem>
                        <SelectItem value="2nd">2nd Year</SelectItem>
                        <SelectItem value="3rd">3rd Year</SelectItem>
                        <SelectItem value="4th">4th Year</SelectItem>
                        <SelectItem value="postgrad">Post Graduate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={() => setBookingStep(2)} 
                    className="btn-primary w-full"
                  >
                    Continue to Schedule
                  </Button>
                </>
              )}

              {bookingStep === 2 && (
                <>
                  <div className="space-y-2">
                    <Label>Preferred Date</Label>
                    <Input 
                      type="date" 
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Available Time Slots</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot.time}
                          variant={selectedTimeSlot === slot.time ? "default" : "outline"}
                          disabled={!slot.available}
                          onClick={() => {
                            setSelectedTimeSlot(slot.time);
                            setFormData({ ...formData, timeSlot: slot.time });
                          }}
                          className={`${selectedTimeSlot === slot.time ? 'btn-primary' : 'btn-secondary'}`}
                        >
                          <Clock className="h-4 w-4 mr-1" />
                          {slot.time}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="concerns">What would you like to discuss? (Optional)</Label>
                    <Textarea 
                      id="concerns"
                      placeholder="Share any specific concerns or topics you'd like to address in your session..."
                      className="min-h-[100px]"
                      value={formData.concerns}
                      onChange={(e) => setFormData({ ...formData, concerns: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Session Type</Label>
                    <Select value={formData.sessionType} onValueChange={(value) => setFormData({ ...formData, sessionType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose session type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual Session (45 mins)</SelectItem>
                        <SelectItem value="crisis">Crisis Support (30 mins)</SelectItem>
                        <SelectItem value="followup">Follow-up Session (30 mins)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      onClick={() => setBookingStep(1)}
                      className="btn-secondary flex-1"
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={handleBooking}
                      disabled={!selectedTimeSlot || isSubmitting}
                      className="btn-primary flex-1"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Booking...
                        </>
                      ) : (
                        "Confirm Booking"
                      )}
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="card-gentle text-center">
            <CardContent className="pt-6">
              <Lock className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">100% Confidential</h3>
              <p className="text-sm text-calm">
                Your sessions are private and protected by strict confidentiality protocols.
              </p>
            </CardContent>
          </Card>

          <Card className="card-gentle text-center">
            <CardContent className="pt-6">
              <Clock className="h-8 w-8 text-success mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-sm text-calm">
                Book sessions that fit your academic schedule, including evenings and weekends.
              </p>
            </CardContent>
          </Card>

          <Card className="card-gentle text-center">
            <CardContent className="pt-6">
              <Shield className="h-8 w-8 text-warning mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Licensed Professionals</h3>
              <p className="text-sm text-calm">
                All our counselors are licensed mental health professionals with student-focused expertise.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Crisis Support */}
        <Alert className="mt-8 border-destructive/50 bg-destructive/5">
          <Phone className="h-4 w-4 text-destructive" />
          <AlertDescription>
            <strong>Need immediate help?</strong> If you're experiencing a mental health crisis, 
            please call our crisis helpline at <strong>1800-MINDCARE</strong> or contact emergency services at 102.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default BookingSystem;