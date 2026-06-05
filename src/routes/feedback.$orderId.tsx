import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Star, CheckCircle, Loader2 } from "lucide-react";

export const Route = createFileRoute("/feedback/$orderId")({
  component: FeedbackPage,
});

function FeedbackPage() {
  const { orderId } = Route.useParams();
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setErrorMsg("Please select a rating.");
      return;
    }
    
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const { error } = await supabase
        .from('feedbacks')
        .insert({
          order_id: orderId,
          rating,
          comments
        });

      if (error) {
        throw error;
      }

      setIsSuccess(true);
    } catch (err: any) {
      console.error("Feedback error:", err);
      setErrorMsg("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/10 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-border text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-display font-bold text-primary-dark mb-4">Thank You!</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Your feedback means the world to us. We appreciate your support and hope to serve you again soon! 🙏
          </p>
          <a href="/" className="inline-block w-full bg-primary text-primary-foreground font-semibold py-3.5 rounded-lg hover:bg-primary/90 transition shadow-md shadow-primary/20">
            Return to Store
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/10 px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-border relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-gold"></div>
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-accent/5 rounded-full blur-2xl"></div>

        <div className="text-center relative z-10 mb-8">
          <h1 className="text-3xl font-display font-bold text-primary-dark mb-2">Rate Your Experience</h1>
          <p className="text-muted-foreground text-sm">
            How was your order from Divine Hub?
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-6 border border-red-100 relative z-10">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="relative z-10">
          <div className="mb-8">
            <label className="block text-center text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Your Rating</label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star 
                    className={`w-10 h-10 transition-colors ${
                      (hoverRating || rating) >= star 
                        ? "fill-yellow-400 text-yellow-400 drop-shadow-sm" 
                        : "text-gray-200"
                    }`} 
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center text-sm font-medium mt-3 text-primary">
                {rating === 1 && "Very Dissatisfied 😞"}
                {rating === 2 && "Dissatisfied 😕"}
                {rating === 3 && "Neutral 😐"}
                {rating === 4 && "Satisfied 🙂"}
                {rating === 5 && "Excellent! 😍"}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-foreground mb-2">Tell us more (Optional)</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition resize-y min-h-[120px] bg-secondary/5"
              placeholder="What did you like? How can we improve?"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground font-semibold py-3.5 rounded-xl hover:bg-primary/90 transition shadow-md shadow-primary/20 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Feedback"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
