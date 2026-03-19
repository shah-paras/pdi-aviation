import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Loader2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const INQUIRY_TYPES = [
  'General Inquiry',
  'Aircraft Purchase',
  'Aircraft Sale',
  'Charter',
  'Partnership',
  'Media'
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    inquiry_type: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.company || !formData.inquiry_type || !formData.message) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'dcacc4a7-34e2-43fb-be04-f1f551a8a6dd',
          subject: `New ${formData.inquiry_type} inquiry from ${formData.name}`,
          from_name: 'PDI Aviation Website',
          botcheck: '',
          ...formData,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '', company: '', inquiry_type: '', message: '' });
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
        <p className="text-slate-300 mb-6">Thank you for reaching out. We'll get back to you shortly.</p>
        <Button onClick={() => setIsSuccess(false)} variant="outline" className="border-slate-700 text-slate-300 hover:bg-white/5">
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-slate-300 mb-1.5 block">Name *</Label>
          <Input
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Your full name"
            required
          />
        </div>
        <div>
          <Label className="text-slate-300 mb-1.5 block">Email *</Label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="you@company.com"
            required
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-slate-300 mb-1.5 block">Phone *</Label>
          <Input
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+91 XXXXXXXXXX"
            required
          />
        </div>
        <div>
          <Label className="text-slate-300 mb-1.5 block">Company *</Label>
          <Input
            value={formData.company}
            onChange={(e) => handleChange('company', e.target.value)}
            placeholder="Your company name"
            required
          />
        </div>
      </div>

      <div>
        <Label className="text-slate-300 mb-1.5 block">Inquiry Type *</Label>
        <Select value={formData.inquiry_type} onValueChange={(v) => handleChange('inquiry_type', v)} required>
          <SelectTrigger>
            <SelectValue placeholder="Select inquiry type" />
          </SelectTrigger>
          <SelectContent>
            {INQUIRY_TYPES.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-slate-300 mb-1.5 block">Message *</Label>
        <Textarea
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          placeholder="Tell us about your requirements..."
          rows={5}
          required
        />
      </div>

      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
      >
        {isSubmitting ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Send className="w-4 h-4 mr-2" />
        )}
        Send Message
      </Button>
    </form>
  );
}