import { useState, useEffect } from "react";
import { apiClient } from "../../../shared/services/apiClient";

export function useProfile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/profile");
      if (res.data && res.data.success) {
        setProfileData(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profileData, loading, error, refetch: fetchProfile };
}
