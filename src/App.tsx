import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './Components/ui/card';
import { Input } from './Components/ui/input';
import { ParetoSection } from './Components/ParetoSection';
import { DeprioritizedSection } from './Components/DeprioritizedSection';
import { ZeigarnikSection } from './Components/ZeigarnikSection';
import { ChampionshipSection } from './Components/ChampionshipSection';
import { DailyReviewSection } from './Components/DailyReviewSection';
import { FormData } from './types';

const initialState: FormData = {
  date: new Date().toISOString().split('T')[0],
  topGoals: [''],
  goalComponents: { goal0: [''] },
  deprioritizedTasks: [{ text: '' }, { text: '' }, { text: '' }],
  environmentSetup: {
    workspace: false,
    materials: false,
    notifications: false
  },
  taskInitiation: {
    morning: [{ task: '', startWith: '' }],
    afternoon: [{ task: '', startWith: '' }]
  },
  championshipGoal: '',
  learningOpportunities: [''],
  endOfDay: {
    tasksCompleted: 0,
    totalTasks: 0,
    energyLevel: 5,
    notes: ''
  }
};

const ProductivityTracker = () => {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('productivityData'+formData.date);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        console.log('Loading saved data:', parsedData);
        setFormData(parsedData);
      } else {
        console.log('No saved data found for date, using initial state');
        setFormData({
          ...initialState,
          date: formData.date // Preserve the selected date
        });
      }
    } catch (e) {
      console.error('Error loading saved data:', e);
      setFormData({
        ...initialState,
        date: formData.date // Preserve the selected date
      });
    }
    setIsInitialized(true);
  }, [formData.date]); // Run effect when date changes


  // Save data to localStorage
  useEffect(() => {
    if (!isInitialized) return; // Skip initial save

    try {
      console.log('Saving data to localStorage:', formData);
      localStorage.setItem('productivityData'+formData.date, JSON.stringify(formData));
    } catch (e) {
      console.error('Error saving data:', e);
    }
  }, [formData, isInitialized]); 

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="shadow-lg">
          <CardHeader className="border-b border-border/40 bg-muted/50">
            <CardTitle className="flex items-center justify-between">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
                Daily Productivity Tracker
              </span>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="w-40 text-sm"
              />
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-8 p-6">
            <ParetoSection formData={formData} setFormData={setFormData} />
            <DeprioritizedSection formData={formData} setFormData={setFormData} />
            <ZeigarnikSection formData={formData} setFormData={setFormData} />
            <ChampionshipSection formData={formData} setFormData={setFormData} />
            <DailyReviewSection formData={formData} setFormData={setFormData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductivityTracker;