import { Input } from './ui/input';
import { InfoTooltip } from './InfoTooltip';
import { FormData } from '../types';

interface ChampionshipSectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const ChampionshipSection = ({ formData, setFormData }: ChampionshipSectionProps) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center space-x-2">
        <h2 className="text-xl font-semibold text-primary">Champion's Mindset</h2>
        <InfoTooltip content="Focus on long-term success over short-term gains" />
      </div>

      <div className="space-y-2">
        <Input
          placeholder="Your ultimate championship goal"
          value={formData.championshipGoal}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            championshipGoal: e.target.value
          }))}
          className="border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20"
        />

        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2 text-gray-700">Growth Insights</h3>
          {formData.learningOpportunities.map((item, index) => (
            <Input
              key={`learning-${index}`}
              className="mt-2 text-sm border-gray-200 focus:border-primary/60 focus:ring-1 focus:ring-primary/20"
              placeholder="What can you learn/experiment with today?"
              value={item}
              onChange={(e) => {
                const newOpps = [...formData.learningOpportunities];
                newOpps[index] = e.target.value;
                setFormData(prev => ({
                  ...prev,
                  learningOpportunities: newOpps
                }));
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}; 