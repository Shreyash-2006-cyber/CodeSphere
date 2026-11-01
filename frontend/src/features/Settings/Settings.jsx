import { useState } from "react";
import { LuUser, LuBell, LuShieldCheck, LuPalette, LuSlidersHorizontal } from "react-icons/lu";
import Card from "../../shared/components/Card";
import Button from "../../shared/components/Button";
import Avatar from "../../shared/components/Avatar";
import ToggleRow from "./components/ToggleRow";
import { notificationSettings, privacySettings } from "./data/settingsMockData";
import { useAuth } from "../../shared/context/AuthContext";
import { useToast } from "../../shared/components/Toast";
import axios from "axios";
import "./styles/Settings.css";

const TABS = [
  { id: "account", label: "Account", icon: LuUser },
  { id: "theme", label: "Theme", icon: LuPalette },
  { id: "notifications", label: "Notifications", icon: LuBell },
  { id: "privacy", label: "Privacy", icon: LuShieldCheck },
  { id: "preferences", label: "Preferences", icon: LuSlidersHorizontal },
];

export default function Settings() {
  const { user, token, updateUsernames } = useAuth();
  const [tab, setTab] = useState("account");
  const [notifications, setNotifications] = useState(notificationSettings);
  const [privacy, setPrivacy] = useState(privacySettings);
  const [theme, setTheme] = useState("light");
  const { showToast } = useToast();

  const [accountForm, setAccountForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    githubUsername: user?.githubUsername || "",
    leetcodeUsername: user?.leetcodeUsername || "",
    neetcodeUsername: user?.neetcodeUsername || "",
  });

  const [saving, setSaving] = useState(false);

  function toggle(list, setList, id) {
    setList(list.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)));
  }

  async function handleSaveAccount(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";
      const res = await axios.put(`${API_BASE}/auth/update`, accountForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data && res.data.success) {
        updateUsernames(res.data.user);
        showToast("Account details updated successfully", "success");
      }
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "Failed to update account", "error");
    } finally {
      setSaving(false);
    }
  }

  function handleSave() {
    showToast("Settings saved", "success");
  }

  return (
    <div className="st-page fade-in">
      <div className="page-heading">
        <h2>Settings</h2>
        <p>Manage your account, notifications, privacy, and preferences.</p>
      </div>

      <div className="st-layout">
        <div className="st-tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`st-tab ${tab === t.id ? "active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              <t.icon /> {t.label}
            </button>
          ))}
        </div>

        <div className="st-content">
          {tab === "account" && (
            <Card>
              <Card.Header title="Account" subtitle="Your personal information" />
              <form onSubmit={handleSaveAccount}>
                <div className="st-account-top">
                  <Avatar name={accountForm.name} size={64} />
                  <Button type="button" variant="outline" size="sm">Change avatar</Button>
                </div>
                <div className="st-field-grid">
                  <div className="form-field">
                    <label>Full name</label>
                    <div className="form-input-wrap">
                      <input 
                        value={accountForm.name} 
                        onChange={(e) => setAccountForm({ ...accountForm, name: e.target.value })} 
                        required 
                      />
                    </div>
                  </div>
                  <div className="form-field">
                    <label>Email</label>
                    <div className="form-input-wrap">
                      <input 
                        type="email" 
                        value={accountForm.email} 
                        onChange={(e) => setAccountForm({ ...accountForm, email: e.target.value })} 
                        required 
                      />
                    </div>
                  </div>
                  <div className="form-field">
                    <label>GitHub username</label>
                    <div className="form-input-wrap">
                      <input 
                        value={accountForm.githubUsername} 
                        onChange={(e) => setAccountForm({ ...accountForm, githubUsername: e.target.value })} 
                      />
                    </div>
                  </div>
                  <div className="form-field">
                    <label>LeetCode username</label>
                    <div className="form-input-wrap">
                      <input 
                        value={accountForm.leetcodeUsername} 
                        onChange={(e) => setAccountForm({ ...accountForm, leetcodeUsername: e.target.value })} 
                      />
                    </div>
                  </div>
                  <div className="form-field">
                    <label>NeetCode username</label>
                    <div className="form-input-wrap">
                      <input 
                        value={accountForm.neetcodeUsername} 
                        onChange={(e) => setAccountForm({ ...accountForm, neetcodeUsername: e.target.value })} 
                      />
                    </div>
                  </div>
                </div>
                <Button type="submit" disabled={saving} style={{ marginTop: 18 }}>
                  {saving ? "Saving..." : "Save changes"}
                </Button>
              </form>
            </Card>
          )}

          {tab === "theme" && (
            <Card>
              <Card.Header title="Theme" subtitle="Choose how CodeSphere looks" />
              <div className="st-theme-grid">
                {["light", "dark", "system"].map((t) => (
                  <button
                    key={t}
                    className={`st-theme-option ${theme === t ? "active" : ""}`}
                    onClick={() => setTheme(t)}
                  >
                    <span className={`st-theme-swatch st-theme-${t}`} />
                    <span style={{ textTransform: "capitalize" }}>{t}</span>
                  </button>
                ))}
              </div>
              <p className="st-theme-note">Dark mode is coming soon — CodeSphere currently ships with a light, professional theme.</p>
            </Card>
          )}

          {tab === "notifications" && (
            <Card>
              <Card.Header title="Notifications" subtitle="Choose what you want to hear about" />
              {notifications.map((n) => (
                <ToggleRow
                  key={n.id}
                  label={n.label}
                  description={n.description}
                  enabled={n.enabled}
                  onToggle={() => toggle(notifications, setNotifications, n.id)}
                />
              ))}
            </Card>
          )}

          {tab === "privacy" && (
            <Card>
              <Card.Header title="Privacy" subtitle="Control what others can see" />
              {privacy.map((p) => (
                <ToggleRow
                  key={p.id}
                  label={p.label}
                  description={p.description}
                  enabled={p.enabled}
                  onToggle={() => toggle(privacy, setPrivacy, p.id)}
                />
              ))}
            </Card>
          )}

          {tab === "preferences" && (
            <Card>
              <Card.Header title="Preferences" subtitle="Fine-tune your experience" />
              <div className="form-field">
                <label>Default landing page</label>
                <select className="st-select" defaultValue="dashboard">
                  <option value="dashboard">Dashboard</option>
                  <option value="analytics">Analytics</option>
                  <option value="tracker">Manual Tracker</option>
                </select>
              </div>
              <div className="form-field" style={{ marginTop: 16 }}>
                <label>Week starts on</label>
                <select className="st-select" defaultValue="monday">
                  <option value="monday">Monday</option>
                  <option value="sunday">Sunday</option>
                </select>
              </div>
              <Button onClick={handleSave} style={{ marginTop: 18 }}>Save preferences</Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
