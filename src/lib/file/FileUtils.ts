export async function downloadFile(filename: string): Promise<void> {
    try {
        const response = await fetch(`/api/files/${filename}`);

        if (!response.ok) {
            throw new Error(`Download failed: ${response.status} ${response.statusText}`);
        }

        const blob: Blob = await response.blob();
        const url: string = window.URL.createObjectURL(blob);

        const link: HTMLAnchorElement = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

    } catch (err: unknown) {
        console.error('Download error:', err);
    }
}