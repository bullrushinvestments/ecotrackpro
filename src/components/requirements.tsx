import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Requirement {
  id: string;
  name: string;
  description: string;
  isCompleted: boolean;
}

const GatherRequirements: React.FC = () => {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [newRequirementName, setNewRequirementName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRequirements();
  }, []);

  const fetchRequirements = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Requirement[]>('/api/requirements');
      setRequirements(response.data);
    } catch (err) {
      setError('Failed to load requirements.');
    } finally {
      setLoading(false);
    }
  };

  const addNewRequirement = async () => {
    try {
      if (!newRequirementName.trim()) return;
      setLoading(true);
      await axios.post('/api/requirements', { name: newRequirementName });
      setRequirements([...requirements, { id: requirements.length.toString(), name: newRequirementName, description: '', isCompleted: false }]);
      setNewRequirementName('');
    } catch (err) {
      setError('Failed to add requirement.');
    } finally {
      setLoading(false);
    }
  };

  const toggleRequirementCompletion = async (id: string) => {
    try {
      await axios.put(`/api/requirements/${id}`);
      setRequirements(requirements.map(req => req.id === id ? { ...req, isCompleted: !req.isCompleted } : req));
    } catch (err) {
      setError(`Failed to toggle requirement completion for ${id}.`);
    }
  };

  const handleRequirementChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setRequirements(prevState => prevState.map((requirement, i) => i === index ? { ...requirement, description: event.target.value } : requirement));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Gather Requirements</h1>
      <form onSubmit={e => e.preventDefault()} className="mb-4">
        <input
          type="text"
          placeholder="Add new requirement..."
          value={newRequirementName}
          onChange={(e) => setNewRequirementName(e.target.value)}
          aria-label="add-new-requirement-input"
          onKeyDown={(e) => {
            if (e.key === 'Enter') addNewRequirement();
          }}
        />
        <button type="button" onClick={addNewRequirement} disabled={!newRequirementName.trim()} className="ml-2 bg-blue-500 text-white rounded px-3 py-1">
          Add
        </button>
      </form>

      {loading && (
        <p>Loading...</p>
      )}

      {!loading && requirements.length === 0 && !error && (
        <p>No requirements found.</p>
      )}

      {error && (
        <div role="alert" className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          {error}
        </div>
      )}

      {!loading && !error && requirements.map((requirement, index) => (
        <div key={requirement.id} className="mb-2 flex justify-between items-center">
          <input
            type="text"
            placeholder={`Describe ${requirement.name}`}
            value={requirement.description}
            onChange={(e) => handleRequirementChange(e, index)}
            aria-label={`description-${requirement.name}-input`}
          />
          <div className="flex space-x-2">
            <button onClick={() => toggleRequirementCompletion(requirement.id)} className={`p-1 ${requirement.isCompleted ? 'bg-green-500 text-white' : ''}`}>
              {requirement.isCompleted ? '✓' : ''}
            </button>
            {/* Add delete button or other actions as needed */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GatherRequirements;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Requirement {
  id: string;
  name: string;
  description: string;
  isCompleted: boolean;
}

const GatherRequirements: React.FC = () => {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [newRequirementName, setNewRequirementName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRequirements();
  }, []);

  const fetchRequirements = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Requirement[]>('/api/requirements');
      setRequirements(response.data);
    } catch (err) {
      setError('Failed to load requirements.');
    } finally {
      setLoading(false);
    }
  };

  const addNewRequirement = async () => {
    try {
      if (!newRequirementName.trim()) return;
      setLoading(true);
      await axios.post('/api/requirements', { name: newRequirementName });
      setRequirements([...requirements, { id: requirements.length.toString(), name: newRequirementName, description: '', isCompleted: false }]);
      setNewRequirementName('');
    } catch (err) {
      setError('Failed to add requirement.');
    } finally {
      setLoading(false);
    }
  };

  const toggleRequirementCompletion = async (id: string) => {
    try {
      await axios.put(`/api/requirements/${id}`);
      setRequirements(requirements.map(req => req.id === id ? { ...req, isCompleted: !req.isCompleted } : req));
    } catch (err) {
      setError(`Failed to toggle requirement completion for ${id}.`);
    }
  };

  const handleRequirementChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setRequirements(prevState => prevState.map((requirement, i) => i === index ? { ...requirement, description: event.target.value } : requirement));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Gather Requirements</h1>
      <form onSubmit={e => e.preventDefault()} className="mb-4">
        <input
          type="text"
          placeholder="Add new requirement..."
          value={newRequirementName}
          onChange={(e) => setNewRequirementName(e.target.value)}
          aria-label="add-new-requirement-input"
          onKeyDown={(e) => {
            if (e.key === 'Enter') addNewRequirement();
          }}
        />
        <button type="button" onClick={addNewRequirement} disabled={!newRequirementName.trim()} className="ml-2 bg-blue-500 text-white rounded px-3 py-1">
          Add
        </button>
      </form>

      {loading && (
        <p>Loading...</p>
      )}

      {!loading && requirements.length === 0 && !error && (
        <p>No requirements found.</p>
      )}

      {error && (
        <div role="alert" className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          {error}
        </div>
      )}

      {!loading && !error && requirements.map((requirement, index) => (
        <div key={requirement.id} className="mb-2 flex justify-between items-center">
          <input
            type="text"
            placeholder={`Describe ${requirement.name}`}
            value={requirement.description}
            onChange={(e) => handleRequirementChange(e, index)}
            aria-label={`description-${requirement.name}-input`}
          />
          <div className="flex space-x-2">
            <button onClick={() => toggleRequirementCompletion(requirement.id)} className={`p-1 ${requirement.isCompleted ? 'bg-green-500 text-white' : ''}`}>
              {requirement.isCompleted ? '✓' : ''}
            </button>
            {/* Add delete button or other actions as needed */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GatherRequirements;