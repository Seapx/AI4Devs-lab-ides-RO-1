import React, { useState } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  education: string;
  experience: string;
  resume: File | null;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  resume?: string;
}

interface CandidateFormProps {
  onSuccess: () => void;
}

const CandidateForm: React.FC<CandidateFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    education: '',
    experience: '',
    resume: null
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (formData.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{1,6}$|^[0-9]{9,15}$/im.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error for this field if any
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileType = file.type;

      if (fileType === 'application/pdf' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFormData({
          ...formData,
          resume: file
        });

        if (errors.resume) {
          setErrors({
            ...errors,
            resume: undefined
          });
        }
      } else {
        setErrors({
          ...errors,
          resume: 'Only PDF or DOCX files are allowed'
        });
        e.target.value = '';
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitStatus('loading');

    try {
      // Create FormData for API call
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);

      if (formData.phone) {
        formDataToSend.append('phone', formData.phone);
      }

      if (formData.address) {
        formDataToSend.append('address', formData.address);
      }

      if (formData.education) {
        formDataToSend.append('education', formData.education);
      }

      if (formData.experience) {
        formDataToSend.append('experience', formData.experience);
      }

      if (formData.resume) {
        formDataToSend.append('resume', formData.resume);
      }

      // Make API call to backend
      const response = await fetch('http://localhost:3010/api/candidates', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add candidate');
      }

      // Success logic
      setSubmitStatus('success');

      // Delay before redirecting to allow user to see success message
      setTimeout(() => {
        onSuccess();
      }, 2500);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to add candidate. Please try again.');
      console.error('Error submitting form:', error);
    }
  };

  const removeFile = () => {
    setFormData({
      ...formData,
      resume: null
    });
  };

  return (
    <div className="candidate-form-container">
      <h2>Add New Candidate</h2>

      {submitStatus === 'loading' && (
        <div className="loading-overlay">
          <div className="loader"></div>
        </div>
      )}

      <form onSubmit={handleSubmit} aria-label="Candidate information form" noValidate>
        <div className="form-group">
          <label htmlFor="firstName">
            First Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            aria-required="true"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
          />
          {errors.firstName && (
            <div className="error" id="firstName-error">{errors.firstName}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">
            Last Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            aria-required="true"
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
          />
          {errors.lastName && (
            <div className="error" id="lastName-error">{errors.lastName}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <div className="error" id="email-error">{errors.email}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <div className="error" id="phone-error">{errors.phone}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="education">Education</label>
          <textarea
            id="education"
            name="education"
            value={formData.education}
            onChange={handleInputChange}
            rows={3}
          />
        </div>

        <div className="form-group">
          <label htmlFor="experience">Work Experience</label>
          <textarea
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            rows={3}
          />
        </div>

        <div className="form-group">
          <label htmlFor="resume">
            Resume (PDF or DOCX)
          </label>
          <div className="file-upload-container">
            <input
              type="file"
              id="resume"
              name="resume"
              onChange={handleFileChange}
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              aria-invalid={!!errors.resume}
              aria-describedby={errors.resume ? "resume-error" : undefined}
            />
            {errors.resume && (
              <div className="error" id="resume-error">{errors.resume}</div>
            )}
            {formData.resume && (
              <div className="file-info">
                <span>{formData.resume.name}</span>
                <button
                  type="button"
                  onClick={removeFile}
                  aria-label="Remove resume file"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="submit-btn"
            disabled={submitStatus === 'loading'}
            aria-busy={submitStatus === 'loading'}
          >
            {submitStatus === 'loading' ? 'Adding Candidate...' : 'Add Candidate'}
          </button>

          {/* Message box below the submit button - shows either success or error */}
          {submitStatus === 'success' && (
            <div className="success-message form-submit-message" role="alert">
              <strong>Success!</strong> Candidate added successfully! Redirecting to dashboard...
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="error-message form-submit-message" role="alert">
              <strong>Error:</strong> {errorMessage}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CandidateForm;
