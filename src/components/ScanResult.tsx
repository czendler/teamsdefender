import { ShieldCheck, Cloud, Mail, Info, Users, KeyRound, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

function Section({ icon, title, children }) {
  return (
    <div className="bg-[#1E293B] dark:bg-[#111827] rounded-xl p-5 mb-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3 text-lg font-semibold text-white">
        {icon}
        <span>{title}</span>
      </div>
      <div className="text-sm text-slate-200 space-y-1">{children}</div>
    </div>
  );
}

function ServiceStatus({ label, value }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${value ? "bg-green-500" : "bg-red-500"}`}></span>
      <span>{label}:</span>
      <span className={value ? "text-green-400" : "text-red-400"}>{value ? "TAK" : "NIE"}</span>
    </div>
  );
}

export function ScanResult({ result }) {
  const [showRaw, setShowRaw] = useState(false);

  return (
    <div className="mt-8">
      <Section icon={<Users size={20} />} title="Tenant info">
        <div><b>Nazwa:</b> <span className="font-mono">{result.tenant}</span></div>
        <div><b>Tenant ID:</b> <span className="font-mono">{result.tenant_id}</span></div>
        <div><b>Domeny:</b> <span className="font-mono">{result.domains?.join(", ")}</span></div>
      </Section>

      <Section icon={<ShieldCheck size={20} />} title="Federation">
        <div><b>Typ przestrzeni:</b> {result.federation_info?.name_space_type}</div>
        <div><b>Brand:</b> {result.federation_info?.federation_brand_name}</div>
        <div><b>Cloud instance:</b> {result.federation_info?.cloud_instance}</div>
      </Section>

      <Section icon={<Cloud size={20} />} title="Microsoft 365 Services">
        <ServiceStatus label="SharePoint" value={!!result.m365_services?.sharepoint} />
        <ServiceStatus label="Teams" value={!!result.communication_services?.teams} />
        <ServiceStatus label="Skype" value={!!result.communication_services?.skype} />
        <div><b>Autodiscover:</b> <span className="font-mono">{result.m365_services?.autodiscover || "-"}</span></div>
      </Section>

      <Section icon={<Mail size={20} />} title="MX / TXT">
        <div><b>MX:</b> <span className="font-mono">{result.m365_services?.mx_records?.join(", ")}</span></div>
        <div><b>TXT:</b> <span className="font-mono">{result.m365_services?.txt_records?.join(", ")}</span></div>
      </Section>

      <Section icon={<KeyRound size={20} />} title="Azure AD Config">
        <div><b>Issuer:</b> <span className="font-mono">{result.azure_ad_config?.issuer}</span></div>
        <div><b>Token endpoint:</b> <span className="font-mono">{result.azure_ad_config?.token_endpoint}</span></div>
        <div><b>Region:</b> <span className="font-mono">{result.azure_ad_config?.tenant_region_scope}</span></div>
      </Section>

      <div className="my-4">
        <button
          type="button"
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 transition"
          onClick={() => setShowRaw(v => !v)}
        >
          {showRaw ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          {showRaw ? "Ukryj surową odpowiedź JSON" : "Pokaż surową odpowiedź JSON"}
        </button>
        {showRaw && (
          <pre className="mt-2 bg-slate-900 text-slate-200 p-3 rounded text-xs overflow-x-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
