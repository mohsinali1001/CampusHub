
import { useEffect, useState } from 'react';

const defaultSettings = {
    adminName: 'Administrator',
    email: 'admin@campushub.edu',
    phone: '',
    emailNotifications: true,
    attendanceNotifications: true,
    studentNotifications: true,
    compactView: false,
};

function getSavedSettings() {
    try {
        const saved = localStorage.getItem('campushub-settings');

        return saved
            ? { ...defaultSettings, ...JSON.parse(saved) }
            : defaultSettings;
    } catch {
        return defaultSettings;
    }
}

function Settings({ isOnline, onToggleOnline }) {
    const [settings, setSettings] = useState(getSavedSettings);
    const [saveMessage, setSaveMessage] = useState('');

    useEffect(() => {
        if (saveMessage) {
            const timeout = setTimeout(() => setSaveMessage(''), 3000);
            return () => clearTimeout(timeout);
        }
    }, [saveMessage]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setSettings((current) => ({
            ...current,
            [name]: value,
        }));

        setSaveMessage('');
    };

    const handleToggleChange = (event) => {
        const { name, checked } = event.target;

        setSettings((current) => ({
            ...current,
            [name]: checked,
        }));

        setSaveMessage('');
    };

    const handleSave = (event) => {
        event.preventDefault();

        try {
            localStorage.setItem(
                'campushub-settings',
                JSON.stringify(settings)
            );

            setSaveMessage('Settings saved successfully.');
        } catch {
            setSaveMessage('Unable to save settings in this browser.');
        }
    };

    const handleReset = () => {
        setSettings({ ...defaultSettings });
        localStorage.removeItem('campushub-settings');
        setSaveMessage('Settings restored to defaults.');
    };

    return (
        <section
            className={`page-section settings-page ${settings.compactView ? 'settings-compact' : ''
                }`}
        >
            <div className="page-heading">
                <div>
                    <h1>Settings</h1>
                    <p>Manage your administrator profile and dashboard preferences.</p>
                </div>
            </div>

            <form onSubmit={handleSave}>
                {/* Administrator Profile */}
                <div className="settings-card">
                    <div className="settings-card-heading">
                        <div>
                            <h2>Administrator Profile</h2>
                            <p>Manage your basic account information.</p>
                        </div>
                        <span className="settings-icon">👤</span>
                    </div>

                    <div className="settings-form-grid">
                        <div className="form-group">
                            <label htmlFor="adminName">Full Name</label>
                            <input
                                id="adminName"
                                name="adminName"
                                value={settings.adminName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={settings.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={settings.phone}
                                onChange={handleInputChange}
                                placeholder="Enter phone number"
                            />
                        </div>
                    </div>
                </div>

                {/* Availability */}
                <div className="settings-card">
                    <div className="settings-card-heading">
                        <div>
                            <h2>Availability Status</h2>
                            <p>Control your administrator availability.</p>
                        </div>
                        <span className="settings-icon">🟢</span>
                    </div>

                    <div className="availability-setting">
                        <div>
                            <strong>{isOnline ? 'Online' : 'Offline'}</strong>
                            <p>
                                {isOnline
                                    ? 'Your account is currently marked as online.'
                                    : 'Your account is currently marked as offline.'}
                            </p>
                        </div>

                        <button
                            type="button"
                            className={`availability-button ${isOnline ? 'is-online' : 'is-offline'
                                }`}
                            onClick={onToggleOnline}
                        >
                            {isOnline ? 'Go Offline' : 'Go Online'}
                        </button>
                    </div>
                </div>

                {/* Notification Preferences */}
                <div className="settings-card">
                    <div className="settings-card-heading">
                        <div>
                            <h2>Notification Preferences</h2>
                            <p>Choose which dashboard notifications you want to receive.</p>
                        </div>
                        <span className="settings-icon">🔔</span>
                    </div>

                    <div className="settings-options">
                        <label className="setting-option">
                            <div>
                                <strong>Email Notifications</strong>
                                <p>Receive general notifications through email.</p>
                            </div>
                            <input
                                type="checkbox"
                                name="emailNotifications"
                                checked={settings.emailNotifications}
                                onChange={handleToggleChange}
                            />
                        </label>

                        <label className="setting-option">
                            <div>
                                <strong>Attendance Notifications</strong>
                                <p>Receive updates related to student attendance.</p>
                            </div>
                            <input
                                type="checkbox"
                                name="attendanceNotifications"
                                checked={settings.attendanceNotifications}
                                onChange={handleToggleChange}
                            />
                        </label>

                        <label className="setting-option">
                            <div>
                                <strong>Student Notifications</strong>
                                <p>Receive notifications about student records.</p>
                            </div>
                            <input
                                type="checkbox"
                                name="studentNotifications"
                                checked={settings.studentNotifications}
                                onChange={handleToggleChange}
                            />
                        </label>
                    </div>
                </div>

                {/* Dashboard Preferences */}
                <div className="settings-card">
                    <div className="settings-card-heading">
                        <div>
                            <h2>Dashboard Preferences</h2>
                            <p>Customize how dashboard information is displayed.</p>
                        </div>
                        <span className="settings-icon">⚙️</span>
                    </div>

                    <label className="setting-option">
                        <div>
                            <strong>Compact View</strong>
                            <p>Enable a more compact presentation of dashboard content.</p>
                        </div>
                        <input
                            type="checkbox"
                            name="compactView"
                            checked={settings.compactView}
                            onChange={handleToggleChange}
                        />
                    </label>
                </div>

                {/* Actions */}
                <div className="settings-actions">
                    <div>
                        {saveMessage && (
                            <p className="settings-save-message" role="status">
                                {saveMessage}
                            </p>
                        )}
                    </div>

                    <div className="settings-action-buttons">
                        <button
                            type="button"
                            className="settings-reset-button"
                            onClick={handleReset}
                        >
                            Reset Defaults
                        </button>

                        <button type="submit" className="primary-button">
                            Save Changes
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default Settings;
