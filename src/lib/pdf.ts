import { jsPDF } from 'jspdf';
import { ContentResponse, ChartData, FinancialData, ScientificData, VisualArtsImage } from './types';

export const generatePDF = (content: ContentResponse, subject: string, topic: string) => {
    const doc = new jsPDF();
    let yPosition = 20;
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxWidth = pageWidth - 2 * margin;
    const lineHeight = 10;

    const checkPageBreak = (extraHeight = 20) => {
        const pageHeight = doc.internal.pageSize.getHeight();
        if (yPosition + extraHeight > pageHeight - margin) {
            doc.addPage();
            yPosition = margin;
        }
    };

    const addWrappedText = (text: string, isBold = false, isListItem = false) => {
        if (isBold) {
            doc.setFont('helvetica', 'bold');
        } else {
            doc.setFont('helvetica', 'normal');
        }

        const splitText = doc.splitTextToSize(text, maxWidth - (isListItem ? 10 : 0));
        let firstLine = true;

        splitText.forEach(line => {
            if (firstLine && isListItem) {
                doc.text('• ' + line, margin, yPosition);
            } else {
                doc.text(line, isListItem ? margin + 10 : margin, yPosition);
            }
            yPosition += lineHeight;
            checkPageBreak();
            firstLine = false;
        });
    };

    const addBulletText = (text: string, isListItem = false) => {
        const boldRegex = /\*\*(.*?)\*\*/g;
        const listRegex = /^(\d+\.|\*|-)\s+(.*)/;
        let match = text.match(listRegex);
        
        let bullet = '';
        let content = text;
    
        if (match) {
            bullet = match[1] + ' ';
            content = match[2];
        }
    
        const parts: { text: string; bold: boolean }[] = [];
        let lastIndex = 0;
    
        while ((match = boldRegex.exec(content)) !== null) {
            if (match.index > lastIndex) {
                parts.push({ text: content.slice(lastIndex, match.index), bold: false });
            }
            parts.push({ text: match[1], bold: true });
            lastIndex = boldRegex.lastIndex;
        }
        if (lastIndex < content.length) {
            parts.push({ text: content.slice(lastIndex), bold: false });
        }
    
        let firstLine = true;
        let xPosition = isListItem ? margin + 10 : margin;
    
        parts.forEach(({ text, bold }) => {
            doc.setFont('helvetica', bold ? 'bold' : 'normal');
            const wrappedText = doc.splitTextToSize(text, maxWidth - (isListItem ? 10 : 0));
    
            wrappedText.forEach(line => {
                if (firstLine && bullet) {
                    doc.text(bullet + line, margin, yPosition);
                } else {
                    doc.text(line, xPosition, yPosition);
                }
                yPosition += lineHeight;
                checkPageBreak();
                firstLine = false;
            });
        });
    
        doc.setFont('helvetica', 'normal');
    };
    
    
    


    const addSection = (title: string, content: string | string[], isList = false) => {
        yPosition += lineHeight;
        addWrappedText(title, true);
        yPosition += 5;
    
        if (Array.isArray(content)) {
            content.forEach(item => {
                addBulletText(item, isList);
            });
        } else {
            content.split("\n").forEach(line => {
                addBulletText(line, isList);
            });
        }
    };
    

    // Title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    addWrappedText(`${subject}: ${topic}`);

    // Set normal font size for content
    doc.setFontSize(12);

    addSection('Title', content.title);
    addSection('Introduction', content.introduction);
    addSection('Key Points', content.keyPoints, true);
    addSection('Activities', content.activities, true);
    addSection('Resources', content.resources, true);

    if (content.videoScript) addSection('Video Script', content.videoScript);
    if (content.codeSnippet) addSection('Code Snippet', content.codeSnippet);
    if (content.videoUrl) addSection('Video URL', content.videoUrl);

    if (content.chartData) {
        checkPageBreak();
        addSection('Chart Information', `Type: ${content.chartData.type}`);
        addWrappedText('Labels: ' + content.chartData.data.labels.join(', '));
        content.chartData.data.datasets.forEach(dataset => {
            addWrappedText(`Dataset: ${dataset.label}`);
            addWrappedText(`Values: ${dataset.data.join(', ')}`);
        });
    }

    if (content.financialData) {
        checkPageBreak();
        addSection('Financial Information', '');
        content.financialData.estimatedCosts.forEach(cost => {
            addWrappedText(`${cost.category}: $${cost.amount}`);
        });
        addWrappedText(`Total Estimate: $${content.financialData.totalEstimate}`);
        addWrappedText(`Timeframe: ${content.financialData.timeframe}`);
        addWrappedText(`Notes: ${content.financialData.notes}`);
    }

    if (content.scientificData) {
        checkPageBreak();
        addSection('Scientific Information', '');
        addWrappedText(`Type: ${content.scientificData.type}`);
        addWrappedText(`Content: ${content.scientificData.content}`);
        addWrappedText(`Explanation: ${content.scientificData.explanation}`);
    }

    if (content.musicNotes) addSection('Music Notes', content.musicNotes);
    if (content.detailedContent) addSection('Detailed Content', content.detailedContent);

    doc.save(`${subject}-${topic}.pdf`);
};
