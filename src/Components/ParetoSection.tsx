import { PlusCircle, Trash2, ArrowDownToLine } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { InfoTooltip } from './InfoTooltip';
import { FormData } from '../types';

interface ParetoSectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const ParetoSection = ({ formData, setFormData }: ParetoSectionProps) => {
  const addGoal = () => {
    setFormData(prev => ({
      ...prev,
      topGoals: [...prev.topGoals, ''],
      goalComponents: {
        ...prev.goalComponents,
        [`goal${prev.topGoals.length}`]: ['']
      }
    }));
  };

  const removeGoal = (index: number) => {
    if (index === 0) return;
    setFormData(prev => {
      const newGoals = prev.topGoals.filter((_, i) => i !== index);
      const newComponents = { ...prev.goalComponents };
      delete newComponents[`goal${index}`];
      return {
        ...prev,
        topGoals: newGoals,
        goalComponents: newComponents
      };
    });
  };

  const addComponent = (goalIndex: number) => {
    setFormData(prev => ({
      ...prev,
      goalComponents: {
        ...prev.goalComponents,
        [`goal${goalIndex}`]: [...(prev.goalComponents[`goal${goalIndex}`] ?? []), '']
      }
    }));
  };

  const removeComponent = (goalIndex: number, componentIndex: number) => {
    setFormData(prev => ({
      ...prev,
      goalComponents: {
        ...prev.goalComponents,
        [`goal${goalIndex}`]: prev.goalComponents[`goal${goalIndex}`].filter((_, i) => i !== componentIndex)
      }
    }));
  };

  const moveToDeprioritized = (goalIndex: number, componentIndex: number) => {
    setFormData(prev => {
      const componentToMove = prev.goalComponents[`goal${goalIndex}`][componentIndex];
      const newComponents = [...prev.goalComponents[`goal${goalIndex}`]];
      newComponents.splice(componentIndex, 1);
      
      return {
        ...prev,
        deprioritizedTasks: [...prev.deprioritizedTasks, {
          text: componentToMove,
          sourceGoalIndex: goalIndex
        }],
        goalComponents: {
          ...prev.goalComponents,
          [`goal${goalIndex}`]: newComponents
        }
      };
    });
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center space-x-2">
        <h2 className="text-xl font-semibold text-primary">Pareto Focus (4% Rule)</h2>
        <InfoTooltip content="Focus on the vital few tasks that will drive the majority of your results" />
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-700">High-Impact Goals</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={addGoal}
            className="hover:bg-primary/5"
          >
            <PlusCircle className="w-4 h-4 mr-2 text-primary" />
            Add Goal
          </Button>
        </div>

        <div className="space-y-4">
          {formData.topGoals.map((goal, index) => (
            <div key={`goal-${index}`} className="group relative">
              <div className="flex gap-2">
                <Input
                  placeholder={`Goal ${index + 1}`}
                  value={goal}
                  onChange={(e) => {
                    const newGoals = [...formData.topGoals];
                    newGoals[index] = e.target.value;
                    setFormData(prev => ({
                      ...prev,
                      topGoals: newGoals
                    }));
                  }}
                  className="border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20"
                />
                {index > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeGoal(index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4 text-red-500 hover:text-red-600" />
                  </Button>
                )}
              </div>

              <div className="mt-2 ml-6 space-y-2">
                <div className="flex items-center justify-end mb-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => addComponent(index)}
                    className="text-xs"
                  >
                    <PlusCircle className="w-3 h-3 mr-1 text-primary" />
                    Add Core Component
                  </Button>
                </div>
                {(formData.goalComponents[`goal${index}`] ?? []).map((component, compIndex) => (
                  <div key={`component-${index}-${compIndex}`} className="group/component flex gap-2">
                    <Input
                      className="text-sm border-gray-200 focus:border-primary/60 focus:ring-1 focus:ring-primary/20"
                      placeholder={`Component ${compIndex + 1}`}
                      value={component}
                      onChange={(e) => {
                        const newComponents = [...(formData.goalComponents[`goal${index}`] ?? [])];
                        newComponents[compIndex] = e.target.value;
                        setFormData(prev => ({
                          ...prev,
                          goalComponents: {
                            ...prev.goalComponents,
                            [`goal${index}`]: newComponents
                          }
                        }));
                      }}
                    />
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveToDeprioritized(index, compIndex)}
                        className="opacity-0 group-hover/component:opacity-100 transition-opacity"
                        title="Move to Deprioritized Tasks"
                      >
                        <ArrowDownToLine className="w-3 h-3 text-primary hover:text-primary/80" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeComponent(index, compIndex)}
                        className="opacity-0 group-hover/component:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3 h-3 text-red-500 hover:text-red-600" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 