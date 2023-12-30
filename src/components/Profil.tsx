// src/components/Profil.tsx
import React, { useEffect, useState } from "react";
import Divider from '@mui/material/Divider';
import { Typography, Link } from "@mui/material";
import axios from "axios";

interface ProfileData {
  telp: string;
  fax: string | null;
  email: string;
  alamat: string;
  provinsi: { id: number; nama: string };
  kota: { id: number; nama: string };
  kecamatan: { id: number; nama: string };
}

export const Frame = (): JSX.Element => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dera.noretest.com/api/kertamulya/profile");
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const dividerStyle = {
    borderBottom: '300px solid #A1A1A1',
  };

  return (
    <div className="frame">
      {profileData && (
        <div className="div">
          <div className="text-wrapper">Kantor</div>
          <div className="div-2">
            {/* Other elements... */}
            <div className="div-3">
              <div className="text-wrapper-2">Alamat</div>
              <Typography className="text-wrapper-3">{profileData.alamat}</Typography>
            </div>
            {/* Other elements... */}
            <div className="div-3">
              <div className="text-wrapper-2">No Telp</div>
              <Typography className="text-wrapper-3">{profileData.telp}</Typography>
            </div>
            {/* Other elements... */}
            <div className="div-3">
              <div className="text-wrapper-2">Fax</div>
              <Typography className="text-wrapper-3">{profileData.fax ?? "N/A"}</Typography>
            </div>
            {/* Other elements... */}
            <div className="div-3">
              <div className="text-wrapper-2">Email</div>
              <Link
                className="text-wrapper-3"
                href={`mailto:${profileData.email}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {profileData.email}
              </Link>
            </div>
            {/* Other elements... */}
          </div>
        </div>
      )}
      <Divider orientation="vertical" sx={dividerStyle} flexItem />
      {/* Kepala Desa section */}
    </div>
  );
};

// Mark the parent component as a "Client Component"
export default function Profil() {
  // You can use other components here if needed
  return (
    <>
      <Frame />
    </>
  );
}
