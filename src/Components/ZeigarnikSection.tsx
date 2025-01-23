import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { InfoTooltip } from './InfoTooltip';
import { FormData, Period } from '../types';

interface ZeigarnikSectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const ZeigarnikSection = ({ formData, setFormData }: ZeigarnikSectionProps) => {
  return (
    <section className="space-y-6">
      <div className="flex items-center space-x-2">
        <h2 className="text-xl font-semibold text-primary">Zeigarnik Effect</h2>
        <InfoTooltip content="Break down tasks into small starting points to reduce procrastination" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Environment Setup</h3>
          <div className="space-y-3 bg-muted/30 p-4 rounded-lg">
            {Object.entries(formData.environmentSetup).map(([key, value]) => (
              <div key={key} className="flex items-center gap-3">
                <Checkbox
                  checked={value}
                  onCheckedChange={(checked) => setFormData(prev => ({
                    ...prev,
                    environmentSetup: {
                      ...prev.environmentSetup,
                      [key]: checked
                    }
                  }))}
                  className="border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <span className="capitalize text-sm">{key === 'workspace' ? 'Workspace Setup' : 
                  key === 'materials' ? 'Essential Materials' : 
                  key === 'notifications' ? 'Focus Settings' : 
                  key.replace(/([A-Z])/g, ' $1').trim()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Task Initiation</h3>
          {(['morning', 'afternoon'] as const).map((period: Period) => (
            <div key={period} className="space-y-3">
              <div className="text-sm font-medium capitalize text-gray-600">{period}:</div>
              {formData.taskInitiation[period].map((item, index) => (
                <div key={`${period}-${index}`} className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Task"
                    value={item.task}
                    onChange={(e) => {
                      const newTasks = [...formData.taskInitiation[period]];
                      newTasks[index] = { ...item, task: e.target.value };
                      setFormData(prev => ({
                        ...prev,
                        taskInitiation: {
                          ...prev.taskInitiation,
                          [period]: newTasks
                        }
                      }));
                    }}
                    className="text-sm border-gray-200"
                  />
                  <Input
                    placeholder="First small step"
                    value={item.startWith}
                    onChange={(e) => {
                      const newTasks = [...formData.taskInitiation[period]];
                      newTasks[index] = { ...item, startWith: e.target.value };
                      setFormData(prev => ({
                        ...prev,
                        taskInitiation: {
                          ...prev.taskInitiation,
                          [period]: newTasks
                        }
                      }));
                    }}
                    className="text-sm border-gray-200"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 