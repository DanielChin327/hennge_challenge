import { useState } from 'react';
import type { CSSProperties, Dispatch, SetStateAction } from 'react';

interface CreateUserFormProps {
  setUserWasCreated: Dispatch<SetStateAction<boolean>>;
}

function CreateUserForm({ setUserWasCreated }: CreateUserFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState({
    length: "",
    number: "",
    uppercase: "",
    lowercase: "",
    spaces: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let errors = {
      length: "",
      number: "",
      uppercase: "",
      lowercase: "",
      spaces: "",
    };

    if (password.length < 10) {
      errors.length = "Password must be at least 10 characters long";
    }
    if (password.length > 24) {
      errors.length = "Password must be at most 24 characters long";
    }
    if (!password.match(/\d/)) {
      errors.number = "Password must contain at least one number";
    }
    if (!password.match(/[A-Z]/)) {
      errors.uppercase = "Password must contain at least one uppercase letter";
    }
    if (!password.match(/[a-z]/)) {
      errors.lowercase = "Password must contain at least one lowercase letter";
    }
    if (password.includes(" ")) {
      errors.spaces = "Password cannot contain spaces";
    }

    if (Object.values(errors).some((error) => error !== "")) {
      setPasswordErrors(errors);
      return;
    }

    setPasswordErrors({ length: "", number: "", uppercase: "", lowercase: "", spaces: "" });

    console.log("User Created:");
    console.log("Username:", username);
    console.log("Password:", password);

    setUserWasCreated(true);
  };

  return (
    <div style={formWrapper}>
      <form style={form} onSubmit={handleSubmit}>
        <label style={formLabel}>Username</label>
        <input
          style={formInput}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-label="Username"
        />

        <label style={formLabel}>Password</label>
        <input
          style={formInput}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="Password"
        />

        {/* Show multiple error messages using the object */}
        {Object.values(passwordErrors).some((error) => error !== "") && (
          <ul style={{ color: "red", fontSize: "14px", marginTop: "8px" }}>
            {Object.entries(passwordErrors).map(([key, error], index) =>
              error ? <li key={index}>{error}</li> : null
            )}
          </ul>
        )}

        <button style={formButton} type="submit">Create User</button>
      </form>
    </div>
  );
}

export { CreateUserForm };

// Styles remain the same...

const formWrapper: CSSProperties = {
  maxWidth: '500px',
  width: '80%',
  backgroundColor: '#efeef5',
  padding: '24px',
  borderRadius: '8px',
};

const form: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const formLabel: CSSProperties = {
  fontWeight: 700,
};

const formInput: CSSProperties = {
  outline: 'none',
  padding: '8px 16px',
  height: '40px',
  fontSize: '14px',
  backgroundColor: '#f8f7fa',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  borderRadius: '4px',
};

const formButton: CSSProperties = {
  outline: 'none',
  borderRadius: '4px',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  backgroundColor: '#7135d2',
  color: 'white',
  fontSize: '16px',
  fontWeight: 500,
  height: '40px',
  padding: '0 8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '8px',
  alignSelf: 'flex-end',
  cursor: 'pointer',
};