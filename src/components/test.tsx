import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Test {
  id: number;
  name: string;
  description: string;
  questions: Question[];
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

interface Option {
  id: number;
  value: string;
}

interface WriteTestProps {
  testId?: number;
}

const WriteTests: React.FC<WriteTestProps> = ({ testId }) => {
  const [test, setTest] = useState<Test | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (testId) {
      fetchTest(testId);
    } else {
      setTest({
        id: -1,
        name: '',
        description: '',
        questions: []
      });
    }
  }, [testId]);

  const fetchTest = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<Test>(`/api/tests/${id}`);
      setTest(response.data);
      setName(response.data.name);
      setDescription(response.data.description);
      setQuestions(response.data.questions);
    } catch (err) {
      setError('Failed to fetch test details.');
    } finally {
      setLoading(false);
    }
  };

  const addQuestion = () => {
    if (!test) return;
    setQuestions([...questions, { id: questions.length + 1, text: '', options: [] }]);
    setCurrentQuestionIndex(questions.length);
  };

  const updateTestName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);

  const updateDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);

  const updateQuestionText = (index: number, text: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, qIndex) => (qIndex === index ? { ...question, text } : question))
    );
  };

  const addOptionToQuestion = (index: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, qIndex) =>
        qIndex === index
          ? { ...question, options: [...question.options, { id: question.options.length + 1, value: '' }] }
          : question
      )
    );
  };

  const updateOptionValue = (index: number, optionIndex: number, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, qIndex) =>
        qIndex === index
          ? {
              ...question,
              options: question.options.map((option, oIndex) => (oIndex === optionIndex ? { ...option, value } : option))
            }
          : question
      )
    );
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
    setCurrentQuestionIndex(Math.max(currentQuestionIndex - 1, 0));
  };

  const saveTest = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!test || !name || !description || questions.length === 0) return;

      await axios.put(`/api/tests/${test.id}`, { name, description, questions });
      alert('Test saved successfully.');
    } catch (err) {
      setError('Failed to save test details.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Write Tests</h1>
      <input
        type="text"
        value={name}
        onChange={updateTestName}
        placeholder="Enter test name..."
        className="border p-2 mb-4 w-full rounded"
        aria-label="test-name-input"
        required
      />
      <textarea
        value={description}
        onChange={updateDescription}
        placeholder="Enter test description..."
        rows={5}
        className="border p-2 mb-4 w-full rounded"
        aria-label="test-description-textarea"
        required
      ></textarea>
      {questions.map((question, index) => (
        <div key={`question-${index}`} className="mb-4">
          <input
            type="text"
            value={question.text}
            onChange={(e) => updateQuestionText(index, e.target.value)}
            placeholder="Enter question..."
            className="border p-2 mb-2 w-full rounded"
            aria-label={`question-text-input-${index}`}
            required
          />
          {question.options.map((option, optionIndex) => (
            <div key={`option-${optionIndex}`} className="mb-1">
              <input
                type="text"
                value={option.value}
                onChange={(e) => updateOptionValue(index, optionIndex, e.target.value)}
                placeholder="Enter option..."
                className="border p-2 w-full rounded"
                aria-label={`question-option-input-${index}-${optionIndex}`}
                required
              />
            </div>
          ))}
          <button onClick={() => addOptionToQuestion(index)} className="text-blue-500 hover:underline">
            Add Option
          </button>
        </div>
      ))}
      {questions.length > 0 && (
        <button type="button" onClick={addQuestion} className="bg-green-500 text-white p-2 rounded mb-4">
          Add Question
        </button>
      )}
      <button type="button" onClick={() => removeQuestion(currentQuestionIndex)} disabled={currentQuestionIndex === 0}>
        Remove Question
      </button>
      <div className="flex justify-end mt-6">
        <button type="button" onClick={saveTest} className="bg-blue-500 text-white p-2 rounded mr-4">
          Save Test
        </button>
        <button type="button" onClick={() => router.push('/tests')} className="border border-gray-300 text-gray-700 p-2 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default WriteTests;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Test {
  id: number;
  name: string;
  description: string;
  questions: Question[];
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

interface Option {
  id: number;
  value: string;
}

interface WriteTestProps {
  testId?: number;
}

const WriteTests: React.FC<WriteTestProps> = ({ testId }) => {
  const [test, setTest] = useState<Test | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (testId) {
      fetchTest(testId);
    } else {
      setTest({
        id: -1,
        name: '',
        description: '',
        questions: []
      });
    }
  }, [testId]);

  const fetchTest = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<Test>(`/api/tests/${id}`);
      setTest(response.data);
      setName(response.data.name);
      setDescription(response.data.description);
      setQuestions(response.data.questions);
    } catch (err) {
      setError('Failed to fetch test details.');
    } finally {
      setLoading(false);
    }
  };

  const addQuestion = () => {
    if (!test) return;
    setQuestions([...questions, { id: questions.length + 1, text: '', options: [] }]);
    setCurrentQuestionIndex(questions.length);
  };

  const updateTestName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);

  const updateDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);

  const updateQuestionText = (index: number, text: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, qIndex) => (qIndex === index ? { ...question, text } : question))
    );
  };

  const addOptionToQuestion = (index: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, qIndex) =>
        qIndex === index
          ? { ...question, options: [...question.options, { id: question.options.length + 1, value: '' }] }
          : question
      )
    );
  };

  const updateOptionValue = (index: number, optionIndex: number, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, qIndex) =>
        qIndex === index
          ? {
              ...question,
              options: question.options.map((option, oIndex) => (oIndex === optionIndex ? { ...option, value } : option))
            }
          : question
      )
    );
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
    setCurrentQuestionIndex(Math.max(currentQuestionIndex - 1, 0));
  };

  const saveTest = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!test || !name || !description || questions.length === 0) return;

      await axios.put(`/api/tests/${test.id}`, { name, description, questions });
      alert('Test saved successfully.');
    } catch (err) {
      setError('Failed to save test details.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Write Tests</h1>
      <input
        type="text"
        value={name}
        onChange={updateTestName}
        placeholder="Enter test name..."
        className="border p-2 mb-4 w-full rounded"
        aria-label="test-name-input"
        required
      />
      <textarea
        value={description}
        onChange={updateDescription}
        placeholder="Enter test description..."
        rows={5}
        className="border p-2 mb-4 w-full rounded"
        aria-label="test-description-textarea"
        required
      ></textarea>
      {questions.map((question, index) => (
        <div key={`question-${index}`} className="mb-4">
          <input
            type="text"
            value={question.text}
            onChange={(e) => updateQuestionText(index, e.target.value)}
            placeholder="Enter question..."
            className="border p-2 mb-2 w-full rounded"
            aria-label={`question-text-input-${index}`}
            required
          />
          {question.options.map((option, optionIndex) => (
            <div key={`option-${optionIndex}`} className="mb-1">
              <input
                type="text"
                value={option.value}
                onChange={(e) => updateOptionValue(index, optionIndex, e.target.value)}
                placeholder="Enter option..."
                className="border p-2 w-full rounded"
                aria-label={`question-option-input-${index}-${optionIndex}`}
                required
              />
            </div>
          ))}
          <button onClick={() => addOptionToQuestion(index)} className="text-blue-500 hover:underline">
            Add Option
          </button>
        </div>
      ))}
      {questions.length > 0 && (
        <button type="button" onClick={addQuestion} className="bg-green-500 text-white p-2 rounded mb-4">
          Add Question
        </button>
      )}
      <button type="button" onClick={() => removeQuestion(currentQuestionIndex)} disabled={currentQuestionIndex === 0}>
        Remove Question
      </button>
      <div className="flex justify-end mt-6">
        <button type="button" onClick={saveTest} className="bg-blue-500 text-white p-2 rounded mr-4">
          Save Test
        </button>
        <button type="button" onClick={() => router.push('/tests')} className="border border-gray-300 text-gray-700 p-2 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default WriteTests;