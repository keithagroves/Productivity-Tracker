import { Input } from './ui/input';
import { InfoTooltip } from './InfoTooltip';
import { FormData } from '../types';

interface DailyReviewSectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const DailyReviewSection = ({ formData, setFormData }: DailyReviewSectionProps) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center space-x-2">
        <h2 className="text-xl font-semibold text-primary">Daily Review</h2>
        <InfoTooltip content="Reflect on your progress and plan for tomorrow" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Day's Achievements</label>
          <div className="flex gap-2 items-center">
            <Input
              type="number"
              value={formData.endOfDay.tasksCompleted}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                endOfDay: {
                  ...prev.endOfDay,
                  tasksCompleted: parseInt(e.target.value) || 0
                }
              }))}
              className="w-20 text-sm border-gray-200"
            />
            <span>/</span>
            <Input
              type="number"
              value={formData.endOfDay.totalTasks}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                endOfDay: {
                  ...prev.endOfDay,
                  totalTasks: parseInt(e.target.value) || 0
                }
              }))}
              className="w-20 text-sm border-gray-200"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Energy Tracker (1-10)</label>
          <Input
            type="number"
            min="1"
            max="10"
            value={formData.endOfDay.energyLevel}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              endOfDay: {
                ...prev.endOfDay,
                energyLevel: parseInt(e.target.value) || 5
              }
            }))}
            className="text-sm border-gray-200"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Key Insights & Learnings</label>
        <textarea
          className="w-full h-32 mt-2 p-2 border rounded-md border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20 text-sm"
          value={formData.endOfDay.notes}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            endOfDay: {
              ...prev.endOfDay,
              notes: e.target.value
            }
          }))}
          placeholder="What worked well? What could be improved? What did you learn?"
        />
      </div>
    </section>
  );
}; 