import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Download, FileText, Database, Code, Settings, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { GoBackButton } from '@/components/ui/go-back-button';
import { apiRequest } from '@/lib/queryClient';

interface ExportOptions {
  format: 'pdf' | 'csv' | 'json';
  includeMetadata: boolean;
  customFields: string[];
  filename: string;
}

interface ExportData {
  title: string;
  subtitle?: string;
  timestamp: string;
  data: any[];
  metadata?: {
    source: string;
    query: string;
    totalResults: number;
    exportedBy: string;
  };
}

export default function ExportCenter() {
  const { toast } = useToast();
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'pdf',
    includeMetadata: true,
    customFields: [],
    filename: ''
  });
  const [customData, setCustomData] = useState('');
  const [useCustomData, setUseCustomData] = useState(false);

  // Fetch sample data
  const { data: sampleResponse, isLoading: loadingSample } = useQuery({
    queryKey: ['/api/export/sample'],
    retry: false
  });

  // Export mutation
  const exportMutation = useMutation({
    mutationFn: async ({ data, options }: { data: ExportData; options: ExportOptions }) => {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data, options }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Export failed');
      }

      // Handle different content types
      const contentType = response.headers.get('content-type');
      const contentDisposition = response.headers.get('content-disposition');
      const filename = contentDisposition?.match(/filename="(.+)"/)?.[1] || 'export';

      let blob: Blob;
      if (contentType?.includes('application/pdf')) {
        const arrayBuffer = await response.arrayBuffer();
        blob = new Blob([arrayBuffer], { type: 'application/pdf' });
      } else if (contentType?.includes('text/csv')) {
        const text = await response.text();
        blob = new Blob([text], { type: 'text/csv' });
      } else if (contentType?.includes('application/json')) {
        const text = await response.text();
        blob = new Blob([text], { type: 'application/json' });
      } else {
        const arrayBuffer = await response.arrayBuffer();
        blob = new Blob([arrayBuffer]);
      }

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      return { filename, success: true };
    },
    onSuccess: (result) => {
      toast({
        title: "Export Successful",
        description: `File "${result.filename}" has been downloaded successfully.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Export Failed",
        description: error instanceof Error ? error.message : 'Export processing failed',
        variant: "destructive",
      });
    }
  });

  const handleExport = () => {
    let exportData: ExportData;

    if (useCustomData && customData.trim()) {
      try {
        const parsedData = JSON.parse(customData);
        exportData = {
          title: 'Custom Data Export',
          subtitle: 'User-provided data export',
          timestamp: new Date().toISOString(),
          data: Array.isArray(parsedData) ? parsedData : [parsedData],
          metadata: {
            source: 'User Input',
            query: 'Custom Data',
            totalResults: Array.isArray(parsedData) ? parsedData.length : 1,
            exportedBy: 'NexusIntel User'
          }
        };
      } catch (error) {
        toast({
          title: "Invalid JSON",
          description: "Please provide valid JSON data for export.",
          variant: "destructive",
        });
        return;
      }
    } else if (sampleResponse?.sampleData) {
      exportData = sampleResponse.sampleData;
    } else {
      toast({
        title: "No Data Available",
        description: "Please provide custom data or wait for sample data to load.",
        variant: "destructive",
      });
      return;
    }

    // Apply custom filename if provided
    const finalOptions = {
      ...exportOptions,
      filename: exportOptions.filename || `nexusintel-export-${Date.now()}`
    };

    exportMutation.mutate({ data: exportData, options: finalOptions });
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'pdf': return <FileText className="h-4 w-4" />;
      case 'csv': return <Database className="h-4 w-4" />;
      case 'json': return <Code className="h-4 w-4" />;
      default: return <Download className="h-4 w-4" />;
    }
  };

  const getFormatDescription = (format: string) => {
    switch (format) {
      case 'pdf': return 'Formatted document with tables and metadata';
      case 'csv': return 'Spreadsheet-compatible comma-separated values';
      case 'json': return 'Structured data format for programming use';
      default: return 'Download format';
    }
  };

  const availableFields = sampleResponse?.sampleData?.data?.[0] ? 
    Object.keys(sampleResponse.sampleData.data[0]) : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <GoBackButton />
        </div>

        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Export Center
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Export your research results and intelligence data in multiple formats
            </p>
          </div>

          {/* Export Configuration */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Format Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Export Format
                </CardTitle>
                <CardDescription>
                  Choose your preferred export format
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {['pdf', 'csv', 'json'].map((format) => (
                    <div
                      key={format}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        exportOptions.format === format
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                      onClick={() => setExportOptions(prev => ({ ...prev, format: format as any }))}
                    >
                      <div className="flex items-center gap-3">
                        {getFormatIcon(format)}
                        <div>
                          <div className="font-medium uppercase">{format}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {getFormatDescription(format)}
                          </div>
                        </div>
                        {exportOptions.format === format && (
                          <CheckCircle className="h-5 w-5 text-blue-500 ml-auto" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Options */}
            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
                <CardDescription>
                  Customize your export settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeMetadata"
                    checked={exportOptions.includeMetadata}
                    onCheckedChange={(checked) =>
                      setExportOptions(prev => ({ ...prev, includeMetadata: !!checked }))
                    }
                  />
                  <Label htmlFor="includeMetadata">Include metadata</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="filename">Custom filename</Label>
                  <Input
                    id="filename"
                    placeholder="Enter filename (optional)"
                    value={exportOptions.filename}
                    onChange={(e) =>
                      setExportOptions(prev => ({ ...prev, filename: e.target.value }))
                    }
                  />
                </div>

                {availableFields.length > 0 && (
                  <div className="space-y-2">
                    <Label>Custom fields (optional)</Label>
                    <div className="flex flex-wrap gap-2">
                      {availableFields.map((field) => (
                        <Badge
                          key={field}
                          variant={exportOptions.customFields.includes(field) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => {
                            setExportOptions(prev => ({
                              ...prev,
                              customFields: prev.customFields.includes(field)
                                ? prev.customFields.filter(f => f !== field)
                                : [...prev.customFields, field]
                            }));
                          }}
                        >
                          {field}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Click fields to include/exclude from export
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Data Source */}
            <Card>
              <CardHeader>
                <CardTitle>Data Source</CardTitle>
                <CardDescription>
                  Choose data to export
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="useCustomData"
                    checked={useCustomData}
                    onCheckedChange={(checked) => setUseCustomData(!!checked)}
                  />
                  <Label htmlFor="useCustomData">Use custom data</Label>
                </div>

                {useCustomData ? (
                  <div className="space-y-2">
                    <Label htmlFor="customData">JSON Data</Label>
                    <Textarea
                      id="customData"
                      placeholder="Enter JSON data to export..."
                      value={customData}
                      onChange={(e) => setCustomData(e.target.value)}
                      rows={8}
                      className="font-mono text-sm"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="text-sm font-medium">Sample Data</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {loadingSample ? 'Loading...' : 
                         sampleResponse?.sampleData ? 
                         `${sampleResponse.sampleData.data.length} sample records available` :
                         'No sample data available'}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Export Action */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <Button
                  onClick={handleExport}
                  disabled={exportMutation.isPending || (!useCustomData && !sampleResponse?.sampleData)}
                  className="px-8 py-3 text-lg"
                >
                  {exportMutation.isPending ? (
                    <>
                      <Download className="mr-2 h-5 w-5 animate-spin" />
                      Generating {exportOptions.format.toUpperCase()}...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-5 w-5" />
                      Export as {exportOptions.format.toUpperCase()}
                    </>
                  )}
                </Button>
                
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Your file will be automatically downloaded when ready
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Format Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Export Format Examples</CardTitle>
              <CardDescription>
                Preview what each format contains
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span className="font-medium">PDF</span>
                  </div>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Professional formatted document</li>
                    <li>• Headers, metadata, and tables</li>
                    <li>• Page numbers and footers</li>
                    <li>• Ready for sharing and printing</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    <span className="font-medium">CSV</span>
                  </div>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Spreadsheet-compatible format</li>
                    <li>• Comments with metadata</li>
                    <li>• Easy data analysis</li>
                    <li>• Opens in Excel, Google Sheets</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    <span className="font-medium">JSON</span>
                  </div>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Structured data format</li>
                    <li>• Programming-friendly</li>
                    <li>• API integration ready</li>
                    <li>• Includes all metadata</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}