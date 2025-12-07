import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface BusinessSpec {
  id: string;
  name: string;
  description: string;
  features: Feature[];
}

interface Feature {
  id: number;
  title: string;
  description: string;
}

const CreateBusinessSpecification: React.FC = () => {
  const [businessName, setBusinessName] = useState('');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch initial data if needed
  }, []);

  const handleAddFeature = (feature: Feature) => {
    setFeatures([...features, feature]);
  };

  const handleRemoveFeature = (id: number) => {
    setFeatures(features.filter(feature => feature.id !== id));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const newBusinessSpec: BusinessSpec = {
        id: crypto.randomUUID(),
        name: businessName,
        description,
        features
      };
      
      await axios.post('/api/business-spec', newBusinessSpec);
      navigate(`/business/${newBusinessSpec.id}`);
    } catch (err) {
      setError('Failed to create the business specification.');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">Create Business Specification</h2>
      {error && <p role="alert" className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Business Name</label>
          <input
            type="text"
            id="name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            required
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="features" className="block text-sm font-medium text-gray-700">Features</label>
          {features.map(feature => (
            <div key={feature.id} className="flex items-center mb-2">
              <span>{feature.title}</span>
              <button
                type="button"
                onClick={() => handleRemoveFeature(feature.id)}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <input
            type="text"
            placeholder="Add feature title..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const newFeature: Feature = { id: features.length + 1, title: e.currentTarget.value, description: '' };
                handleAddFeature(newFeature);
                e.currentTarget.value = '';
              }
            }}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 mt-4 text-white bg-blue-600 hover:bg-blue-700 ${loading ? 'cursor-not-allowed' : ''}`}
        >
          {loading ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default CreateBusinessSpecification;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface BusinessSpec {
  id: string;
  name: string;
  description: string;
  features: Feature[];
}

interface Feature {
  id: number;
  title: string;
  description: string;
}

const CreateBusinessSpecification: React.FC = () => {
  const [businessName, setBusinessName] = useState('');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch initial data if needed
  }, []);

  const handleAddFeature = (feature: Feature) => {
    setFeatures([...features, feature]);
  };

  const handleRemoveFeature = (id: number) => {
    setFeatures(features.filter(feature => feature.id !== id));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const newBusinessSpec: BusinessSpec = {
        id: crypto.randomUUID(),
        name: businessName,
        description,
        features
      };
      
      await axios.post('/api/business-spec', newBusinessSpec);
      navigate(`/business/${newBusinessSpec.id}`);
    } catch (err) {
      setError('Failed to create the business specification.');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">Create Business Specification</h2>
      {error && <p role="alert" className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Business Name</label>
          <input
            type="text"
            id="name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            required
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="features" className="block text-sm font-medium text-gray-700">Features</label>
          {features.map(feature => (
            <div key={feature.id} className="flex items-center mb-2">
              <span>{feature.title}</span>
              <button
                type="button"
                onClick={() => handleRemoveFeature(feature.id)}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <input
            type="text"
            placeholder="Add feature title..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const newFeature: Feature = { id: features.length + 1, title: e.currentTarget.value, description: '' };
                handleAddFeature(newFeature);
                e.currentTarget.value = '';
              }
            }}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 mt-4 text-white bg-blue-600 hover:bg-blue-700 ${loading ? 'cursor-not-allowed' : ''}`}
        >
          {loading ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default CreateBusinessSpecification;