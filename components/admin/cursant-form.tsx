'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import type { Cursant } from '@/app/admin/cursanti/page';

interface CursantFormProps {
  cursant: Cursant | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function CursantForm({ cursant, onSuccess, onCancel }: CursantFormProps) {
  const [nume, setNume] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setNume(cursant?.nume ?? '');
    setError('');
  }, [cursant]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nume.trim()) {
      setError('Numele este obligatoriu.');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      const url = cursant ? `/api/cursanti/${cursant.id}` : '/api/cursanti';
      const method = cursant ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nume }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Eroare la salvare');
      }

      onSuccess();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Eroare la salvare');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>{cursant ? 'Editează Cursant' : 'Adaugă Cursant'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nume">Nume</Label>
            <Input
              id="nume"
              value={nume}
              onChange={e => setNume(e.target.value)}
              placeholder="Numele cursantului"
              autoFocus
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {cursant ? 'Salvează modificările' : 'Adaugă cursant'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Anulează
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
