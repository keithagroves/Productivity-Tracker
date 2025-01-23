import { PlusCircle, Trash2, ArrowUpToLine } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { InfoTooltip } from './InfoTooltip';
import { FormData } from '../types';

interface DeprioritizedSectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const DeprioritizedSection = ({ formData, setFormData }: DeprioritizedSectionProps) => {
  const addTask = () => {
    setFormData(prev => ({
      ...prev,
      deprioritizedTasks: [...prev.deprioritizedTasks, { text: '' }]
    }));
  };

  const removeTask = (index: number) => {
    setFormData(prev => ({
      ...prev,
      deprioritizedTasks: prev.deprioritizedTasks.filter((_, i) => i !== index)
    }));
  };

  const moveBackToGoal = (taskIndex: number) => {
    const task = formData.deprioritizedTasks[taskIndex];
    if (task.sourceGoalIndex === undefined) return;

    setFormData(prev => {
      const newDeprioritized = [...prev.deprioritizedTasks];
      newDeprioritized.splice(taskIndex, 1);

      const goalKey = `goal${task.sourceGoalIndex}`;
      const currentComponents = prev.goalComponents[goalKey] ?? [];

      return {
        ...prev,
        deprioritizedTasks: newDeprioritized,
        goalComponents: {
          ...prev.goalComponents,
          [goalKey]: [...currentComponents, task.text]
        }
      };
    });
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-semibold text-primary">Intentional Deprioritization</h2>
          <InfoTooltip content="List tasks you're consciously choosing not to do today to maintain focus on your top goals" />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={addTask}
          className="hover:bg-primary/5"
        >
          <PlusCircle className="w-4 h-4 mr-2 text-primary" />
          Add Task
        </Button>
      </div>

      <div className="space-y-3">
        {formData.deprioritizedTasks.map((task, index) => (
          <div key={`deprioritized-${index}`} className="group relative flex gap-2">
            <Input
              placeholder={`Task ${index + 1} to not do today`}
              value={task.text}
              onChange={(e) => {
                const newTasks = [...formData.deprioritizedTasks];
                newTasks[index] = { ...newTasks[index], text: e.target.value };
                setFormData(prev => ({
                  ...prev,
                  deprioritizedTasks: newTasks
                }));
              }}
              className="border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20"
            />
            <div className="flex gap-1">
              {task.sourceGoalIndex !== undefined && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveBackToGoal(index)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  title={`Move back to Goal ${task.sourceGoalIndex + 1}`}
                >
                  <ArrowUpToLine className="w-4 h-4 text-primary hover:text-primary/80" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeTask(index)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4 text-red-500 hover:text-red-600" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}; 