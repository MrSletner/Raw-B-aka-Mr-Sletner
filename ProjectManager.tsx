import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, FolderOpen, Download } from 'lucide-react';

interface ProjectData {
  sequence: boolean[][];
  volumes: number[];
  bpm: number;
  name: string;
}

interface ProjectManagerProps {
  projectData: ProjectData;
  onSave: (name: string) => void;
  onLoad: (data: ProjectData) => void;
  onExport: (format: 'wav' | 'mp3') => void;
}

const ProjectManager: React.FC<ProjectManagerProps> = ({
  projectData,
  onSave,
  onLoad,
  onExport
}) => {
  const [projectName, setProjectName] = React.useState('');
  const [savedProjects, setSavedProjects] = React.useState<ProjectData[]>([]);

  React.useEffect(() => {
    const saved = localStorage.getItem('drumSamplerProjects');
    if (saved) {
      setSavedProjects(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    if (!projectName.trim()) return;
    const newProject = { ...projectData, name: projectName };
    const updated = [...savedProjects, newProject];
    setSavedProjects(updated);
    localStorage.setItem('drumSamplerProjects', JSON.stringify(updated));
    onSave(projectName);
    setProjectName('');
  };

  const handleLoad = (project: ProjectData) => {
    onLoad(project);
  };

  return (
    <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
      <h3 className="font-semibold text-sm">Project Manager</h3>
      
      <div className="flex gap-2">
        <Input
          placeholder="Project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="flex-1 h-8 text-sm"
        />
        <Button onClick={handleSave} size="sm" disabled={!projectName.trim()}>
          <Save size={14} />
        </Button>
      </div>

      <div className="space-y-1">
        <h4 className="text-xs font-medium">Saved Projects:</h4>
        {savedProjects.map((project, index) => (
          <div key={index} className="flex items-center justify-between bg-white p-2 rounded text-sm">
            <span>{project.name}</span>
            <Button onClick={() => handleLoad(project)} size="sm" variant="outline">
              <FolderOpen size={12} />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button onClick={() => onExport('wav')} size="sm" variant="outline" className="flex-1">
          <Download size={14} />
          WAV
        </Button>
        <Button onClick={() => onExport('mp3')} size="sm" variant="outline" className="flex-1">
          <Download size={14} />
          MP3
        </Button>
      </div>
    </div>
  );
};

export default ProjectManager;