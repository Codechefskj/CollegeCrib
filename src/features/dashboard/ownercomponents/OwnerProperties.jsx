import { useEffect, useState } from "react";
import axios from "axios";
import OwnerSidebar from "../ownercomponents/OwnerSidebar";
import OwnerPropertyList from "../ownercomponents/OwnerPropertyList";

function OwnerProperties() {
  const [properties, setProperties] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);

  const fetchProperties = async () => {
    setFetchLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://collegecrib-backend.onrender.com/api/property/my", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProperties(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => { fetchProperties(); }, []);

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      <OwnerSidebar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">My Properties</h1>

        {/* UI-only: skeleton while loading */}
        {fetchLoading && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{
                height: 280, borderRadius: 16,
                background: "linear-gradient(135deg, #111827, #0f1923)",
                border: "1px solid rgba(255,255,255,0.07)",
                animation: "pulse 1.5s ease-in-out infinite"
              }}>
                <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
              </div>
            ))}
          </div>
        )}

        {!fetchLoading && <OwnerPropertyList properties={properties} />}
      </div>
    </div>
  );
}

export default OwnerProperties;