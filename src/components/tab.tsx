import { useState } from "react";
import { Switch } from "@radix-ui/react-switch";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

interface Tab {
  title: string;
  content: JSX.Element;
}

interface TabComponentProps {
  tabs: Tab[];
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export default function TabComponent({ tabs, theme, setTheme }: TabComponentProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.title || "");



  return (
    <>
      <ul className="nav nav-tabs mb-3" role="tablist">
        {tabs.map((tab, index) => (
          <li key={index} className="nav-item" role="presentation">
            <a
              className={`nav-link ${activeTab === tab.title ? "active" : ""}`}
              data-bs-toggle="tab"
              href={`#tab-${index}`}
              role="tab"
              onClick={() => setActiveTab(tab.title)}
            >
              {tab.title}
            </a>
          </li>
        ))}
      </ul>

      <div className="tab-content">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab-pane fade ${activeTab === tab.title ? "show active" : ""}`}
            id={`tab-${index}`}
            role="tabpanel"
          >
            <div className="card">
              <div className="card-body">
                {tab.content}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 border rounded-md">
                      {theme === "light" ? "☀️" : "🌙"}
                    </div>
                    <div>
                      <p className="font-medium">Theme</p>
                      <p className="text-sm text-muted-foreground">
                        {theme === "light" ? "Light theme" : "Dark theme"}
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="theme-toggle"
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
