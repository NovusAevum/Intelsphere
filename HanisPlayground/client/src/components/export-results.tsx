import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Database, Code, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface OSINTIntelligence {
  target: string;
  confidence: number;
  threat_level: 'low' | 'medium' | 'high' | 'critical';
  classification: 'public' | 'sensitive' | 'confidential' | 'classified';
  
  identity_profile: {
    full_name: string;
    aliases: string[];
    age_range: string;
    location: {
      current: string;
      previous: string[];
      coordinates: { lat: number; lng: number } | null;
    };
    occupation: string;
    education: string[];
    family_members: string[];
  };

  digital_presence: {
    social_profiles: Array<{
      platform: string;
      username: string;
      url: string;
      followers: number;
      activity_level: string;
      last_active: string;
      profile_analysis: string;
      connections: string[];
    }>;
    email_addresses: Array<{
      email: string;
      verified: boolean;
      breach_status: string;
      associated_services: string[];
      creation_date: string;
    }>;
    phone_numbers: Array<{
      number: string;
      type: 'mobile' | 'landline' | 'voip';
      carrier: string;
      location: string;
      associated_accounts: string[];
    }>;
    usernames: Array<{
      username: string;
      platforms: string[];
      availability: boolean;
      variations: string[];
    }>;
  };

  technical_profile: {
    ip_addresses: Array<{
      ip: string;
      location: string;
      isp: string;
      usage_pattern: string;
      security_level: string;
    }>;
    devices: Array<{
      device_type: string;
      os: string;
      browser: string;
      fingerprint: string;
      last_seen: string;
    }>;
    domains: Array<{
      domain: string;
      ownership: string;
      creation_date: string;
      technologies: string[];
      security_status: string;
    }>;
    network_infrastructure: {
      hosting_providers: string[];
      cdn_services: string[];
      security_services: string[];
      vulnerabilities: string[];
    };
  };

  sources_analyzed: Array<{
    source_type: string;
    source_name: string;
    data_points: number;
    reliability: number;
    last_updated: string;
    access_method: string;
  }>;

  opsec_analysis: {
    digital_hygiene: string;
    privacy_awareness: string;
    security_vulnerabilities: string[];
    exploitation_vectors: string[];
    defensive_recommendations: string[];
  };
}

interface ExportResultsProps {
  intelligence: OSINTIntelligence;
  onClose: () => void;
}

interface ExportStatus {
  format: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  downloadUrl?: string;
  error?: string;
}

export default function ExportResults({ intelligence, onClose }: ExportResultsProps) {
  const [exportStatuses, setExportStatuses] = useState<ExportStatus[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  const exportFormats = [
    {
      id: 'pdf',
      name: 'PDF Report',
      description: 'Professional intelligence report with formatting',
      icon: FileText,
      color: 'red'
    },
    {
      id: 'csv',
      name: 'CSV Data',
      description: 'Structured data for analysis and import',
      icon: Database,
      color: 'green'
    },
    {
      id: 'json',
      name: 'JSON Format',
      description: 'Raw data for technical integration',
      icon: Code,
      color: 'blue'
    }
  ];

  const generatePDFReport = async (): Promise<string> => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Header
    pdf.setFontSize(20);
    pdf.setTextColor(220, 53, 69); // Red color
    pdf.text('OSINT INTELLIGENCE REPORT', pageWidth / 2, 30, { align: 'center' });
    
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Classification: ${intelligence.classification.toUpperCase()}`, 20, 50);
    pdf.text(`Generated: ${new Date().toLocaleString()}`, 20, 60);
    pdf.text(`Target: ${intelligence.target}`, 20, 70);
    pdf.text(`Confidence: ${intelligence.confidence}%`, 20, 80);
    pdf.text(`Threat Level: ${intelligence.threat_level.toUpperCase()}`, 20, 90);

    let yPosition = 110;

    // Identity Profile Section
    pdf.setFontSize(14);
    pdf.setTextColor(220, 53, 69);
    pdf.text('IDENTITY PROFILE', 20, yPosition);
    yPosition += 15;

    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    
    const identityData = [
      ['Full Name', intelligence.identity_profile.full_name],
      ['Age Range', intelligence.identity_profile.age_range],
      ['Current Location', intelligence.identity_profile.location.current],
      ['Occupation', intelligence.identity_profile.occupation],
      ['Aliases', intelligence.identity_profile.aliases.join(', ')],
      ['Education', intelligence.identity_profile.education.join(', ')]
    ];

    (pdf as any).autoTable({
      startY: yPosition,
      head: [['Field', 'Value']],
      body: identityData,
      theme: 'striped',
      headStyles: { fillColor: [220, 53, 69] },
      styles: { fontSize: 9 }
    });

    yPosition = (pdf as any).lastAutoTable.finalY + 20;

    // Digital Presence Section
    if (yPosition > pageHeight - 50) {
      pdf.addPage();
      yPosition = 30;
    }

    pdf.setFontSize(14);
    pdf.setTextColor(220, 53, 69);
    pdf.text('DIGITAL PRESENCE', 20, yPosition);
    yPosition += 15;

    // Social Profiles Table
    if (intelligence.digital_presence.social_profiles.length > 0) {
      const socialData = intelligence.digital_presence.social_profiles.map(profile => [
        profile.platform,
        profile.username,
        profile.followers.toString(),
        profile.activity_level,
        profile.last_active
      ]);

      (pdf as any).autoTable({
        startY: yPosition,
        head: [['Platform', 'Username', 'Followers', 'Activity', 'Last Active']],
        body: socialData,
        theme: 'striped',
        headStyles: { fillColor: [40, 167, 69] },
        styles: { fontSize: 8 }
      });

      yPosition = (pdf as any).lastAutoTable.finalY + 15;
    }

    // Email Addresses Table
    if (intelligence.digital_presence.email_addresses.length > 0) {
      if (yPosition > pageHeight - 50) {
        pdf.addPage();
        yPosition = 30;
      }

      const emailData = intelligence.digital_presence.email_addresses.map(email => [
        email.email,
        email.verified ? 'Verified' : 'Unverified',
        email.breach_status,
        email.associated_services.join(', ')
      ]);

      (pdf as any).autoTable({
        startY: yPosition,
        head: [['Email', 'Status', 'Breach Status', 'Associated Services']],
        body: emailData,
        theme: 'striped',
        headStyles: { fillColor: [255, 193, 7] },
        styles: { fontSize: 8 }
      });

      yPosition = (pdf as any).lastAutoTable.finalY + 20;
    }

    // Sources Analyzed Section
    if (yPosition > pageHeight - 50) {
      pdf.addPage();
      yPosition = 30;
    }

    pdf.setFontSize(14);
    pdf.setTextColor(220, 53, 69);
    pdf.text('INTELLIGENCE SOURCES', 20, yPosition);
    yPosition += 15;

    const sourcesData = intelligence.sources_analyzed.map(source => [
      source.source_name,
      source.source_type,
      source.data_points.toString(),
      (source.reliability * 100).toFixed(1) + '%',
      source.access_method
    ]);

    (pdf as any).autoTable({
      startY: yPosition,
      head: [['Source Name', 'Type', 'Data Points', 'Reliability', 'Access Method']],
      body: sourcesData,
      theme: 'striped',
      headStyles: { fillColor: [108, 117, 125] },
      styles: { fontSize: 8 }
    });

    yPosition = (pdf as any).lastAutoTable.finalY + 20;

    // Security Assessment Section
    if (yPosition > pageHeight - 50) {
      pdf.addPage();
      yPosition = 30;
    }

    pdf.setFontSize(14);
    pdf.setTextColor(220, 53, 69);
    pdf.text('SECURITY ASSESSMENT', 20, yPosition);
    yPosition += 15;

    const securityData = [
      ['Digital Hygiene', intelligence.opsec_analysis.digital_hygiene],
      ['Privacy Awareness', intelligence.opsec_analysis.privacy_awareness],
      ['Vulnerabilities', intelligence.opsec_analysis.security_vulnerabilities.join(', ')],
      ['Exploitation Vectors', intelligence.opsec_analysis.exploitation_vectors.join(', ')],
      ['Recommendations', intelligence.opsec_analysis.defensive_recommendations.join(', ')]
    ];

    (pdf as any).autoTable({
      startY: yPosition,
      head: [['Assessment Area', 'Finding']],
      body: securityData,
      theme: 'striped',
      headStyles: { fillColor: [220, 53, 69] },
      styles: { fontSize: 9 }
    });

    // Footer
    const totalPages = pdf.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(128, 128, 128);
      pdf.text(`Page ${i} of ${totalPages}`, pageWidth - 30, pageHeight - 10);
      pdf.text('CONFIDENTIAL - OSINT INTELLIGENCE REPORT', 20, pageHeight - 10);
    }

    const pdfBlob = pdf.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    return url;
  };

  const generateCSVData = async (): Promise<string> => {
    const csvData = [];
    
    // Header
    csvData.push(['OSINT Intelligence Report']);
    csvData.push(['Generated', new Date().toISOString()]);
    csvData.push(['Target', intelligence.target]);
    csvData.push(['Confidence', intelligence.confidence + '%']);
    csvData.push(['Threat Level', intelligence.threat_level]);
    csvData.push(['Classification', intelligence.classification]);
    csvData.push([]);

    // Identity Profile
    csvData.push(['IDENTITY PROFILE']);
    csvData.push(['Field', 'Value']);
    csvData.push(['Full Name', intelligence.identity_profile.full_name]);
    csvData.push(['Age Range', intelligence.identity_profile.age_range]);
    csvData.push(['Current Location', intelligence.identity_profile.location.current]);
    csvData.push(['Previous Locations', intelligence.identity_profile.location.previous.join('; ')]);
    csvData.push(['Occupation', intelligence.identity_profile.occupation]);
    csvData.push(['Aliases', intelligence.identity_profile.aliases.join('; ')]);
    csvData.push(['Education', intelligence.identity_profile.education.join('; ')]);
    csvData.push([]);

    // Social Profiles
    csvData.push(['SOCIAL MEDIA PROFILES']);
    csvData.push(['Platform', 'Username', 'URL', 'Followers', 'Activity Level', 'Last Active', 'Analysis']);
    intelligence.digital_presence.social_profiles.forEach(profile => {
      csvData.push([
        profile.platform,
        profile.username,
        profile.url,
        profile.followers.toString(),
        profile.activity_level,
        profile.last_active,
        profile.profile_analysis
      ]);
    });
    csvData.push([]);

    // Email Addresses
    csvData.push(['EMAIL ADDRESSES']);
    csvData.push(['Email', 'Verified', 'Breach Status', 'Associated Services', 'Creation Date']);
    intelligence.digital_presence.email_addresses.forEach(email => {
      csvData.push([
        email.email,
        email.verified ? 'Yes' : 'No',
        email.breach_status,
        email.associated_services.join('; '),
        email.creation_date
      ]);
    });
    csvData.push([]);

    // Sources Analyzed
    csvData.push(['INTELLIGENCE SOURCES']);
    csvData.push(['Source Name', 'Type', 'Data Points', 'Reliability', 'Last Updated', 'Access Method']);
    intelligence.sources_analyzed.forEach(source => {
      csvData.push([
        source.source_name,
        source.source_type,
        source.data_points.toString(),
        (source.reliability * 100).toFixed(1) + '%',
        source.last_updated,
        source.access_method
      ]);
    });
    csvData.push([]);

    // Security Assessment
    csvData.push(['SECURITY ASSESSMENT']);
    csvData.push(['Assessment Area', 'Finding']);
    csvData.push(['Digital Hygiene', intelligence.opsec_analysis.digital_hygiene]);
    csvData.push(['Privacy Awareness', intelligence.opsec_analysis.privacy_awareness]);
    csvData.push(['Security Vulnerabilities', intelligence.opsec_analysis.security_vulnerabilities.join('; ')]);
    csvData.push(['Exploitation Vectors', intelligence.opsec_analysis.exploitation_vectors.join('; ')]);
    csvData.push(['Defensive Recommendations', intelligence.opsec_analysis.defensive_recommendations.join('; ')]);

    const csvContent = csvData.map(row => 
      row.map(cell => `"${(cell || '').toString().replace(/"/g, '""')}"`).join(',')
    ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    return url;
  };

  const generateJSONData = async (): Promise<string> => {
    const jsonData = {
      report_metadata: {
        generated_at: new Date().toISOString(),
        report_type: 'OSINT_Intelligence_Report',
        version: '1.0',
        classification: intelligence.classification
      },
      intelligence_data: intelligence
    };

    const jsonString = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    return url;
  };

  const handleExport = async (format: string) => {
    setIsExporting(true);
    
    // Update status to processing
    setExportStatuses(prev => [
      ...prev.filter(s => s.format !== format),
      { format, status: 'processing' }
    ]);

    try {
      let downloadUrl: string;
      let filename: string;

      switch (format) {
        case 'pdf':
          downloadUrl = await generatePDFReport();
          filename = `OSINT_Report_${intelligence.target}_${new Date().toISOString().slice(0, 10)}.pdf`;
          break;
        case 'csv':
          downloadUrl = await generateCSVData();
          filename = `OSINT_Data_${intelligence.target}_${new Date().toISOString().slice(0, 10)}.csv`;
          break;
        case 'json':
          downloadUrl = await generateJSONData();
          filename = `OSINT_Intelligence_${intelligence.target}_${new Date().toISOString().slice(0, 10)}.json`;
          break;
        default:
          throw new Error('Unsupported format');
      }

      // Create download link
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Update status to completed
      setExportStatuses(prev => [
        ...prev.filter(s => s.format !== format),
        { format, status: 'completed', downloadUrl }
      ]);

    } catch (error) {
      console.error(`Export ${format} failed:`, error);
      
      // Update status to error
      setExportStatuses(prev => [
        ...prev.filter(s => s.format !== format),
        { format, status: 'error', error: (error as Error).message }
      ]);
    }

    setIsExporting(false);
  };

  const handleExportAll = async () => {
    for (const format of exportFormats) {
      await handleExport(format.id);
      // Small delay between exports
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Clock className="w-4 h-4 text-yellow-400 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return null;
    }
  };

  const getFormatStatus = (formatId: string) => {
    return exportStatuses.find(s => s.format === formatId);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full border border-cyan-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Export Intelligence Report</h2>
          <p className="text-gray-400">
            Export your OSINT intelligence findings in professional formats
          </p>
        </div>

        {/* Export Options */}
        <div className="space-y-4 mb-8">
          {exportFormats.map((format) => {
            const IconComponent = format.icon;
            const status = getFormatStatus(format.id);
            
            return (
              <motion.div
                key={format.id}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg bg-${format.color}-500/20`}>
                      <IconComponent className={`w-6 h-6 text-${format.color}-400`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{format.name}</h3>
                      <p className="text-gray-400 text-sm">{format.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {status && getStatusIcon(status.status)}
                    
                    <motion.button
                      onClick={() => handleExport(format.id)}
                      disabled={isExporting || status?.status === 'processing'}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                        status?.status === 'completed'
                          ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                          : status?.status === 'error'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                          : status?.status === 'processing'
                          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 cursor-not-allowed'
                          : `bg-${format.color}-500/20 text-${format.color}-400 border border-${format.color}-500/50 hover:bg-${format.color}-500/30`
                      }`}
                    >
                      {status?.status === 'completed' ? 'Downloaded' :
                       status?.status === 'processing' ? 'Exporting...' :
                       status?.status === 'error' ? 'Retry' :
                       'Export'}
                    </motion.button>
                  </div>
                </div>
                
                {status?.status === 'error' && (
                  <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-red-400 text-sm">Error: {status.error}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <motion.button
            onClick={handleExportAll}
            disabled={isExporting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExporting ? 'Exporting All...' : 'Export All Formats'}
          </motion.button>
          
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gray-700 text-white rounded-xl font-bold hover:bg-gray-600"
          >
            Close
          </motion.button>
        </div>

        {/* Export Statistics */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-400">
                {exportStatuses.filter(s => s.status === 'completed').length}
              </div>
              <div className="text-gray-400 text-sm">Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">
                {exportStatuses.filter(s => s.status === 'processing').length}
              </div>
              <div className="text-gray-400 text-sm">Processing</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-400">
                {exportStatuses.filter(s => s.status === 'error').length}
              </div>
              <div className="text-gray-400 text-sm">Failed</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}