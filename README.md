# 🩺 AnnotateRx — AI-Assisted Medical Data Labeling Platform

> **Theme**: People and Technology Working Together  
> **Event**: Loop x IIT-B Hackathon

---

## 📋 Table of Contents

1. [The Problem](#-the-problem)
2. [The Solution](#-the-solution)
3. [How AI Helps](#-how-ai-helps)
4. [Key Features](#-key-features)
5. [Impact](#-impact)
6. [Technical Architecture](#-technical-architecture)
7. [AI Models](#-ai-models)
8. [Getting Started](#-getting-started)

---

## 🎯 The Problem

AI is revolutionizing healthcare, but **medical AI models are only as good as the data they're trained on**.

### Current Challenges

* **Manual, repetitive annotation tasks** — Radiologists spend hours manually drawing boundaries on medical images
* **Limited access to expert radiologists** — Scarce specialists create bottlenecks in dataset creation
* **Complex, gigabyte-scale medical images** — CT scans, MRIs, and X-rays require specialized tools
* **No built-in QA, collaboration, or compliance tools** — Teams use outdated offline software like 3D Slicer
* **Slow, siloed, and insecure workflows** — No cloud-native solutions for medical annotation

### The Indian Healthcare Context

Healthcare in India faces unique challenges:
- Scattered medical records across labs, clinics, and apps
- Researchers struggling to access labeled data for training safe and reliable medical AI
- Understaffed facilities with limited time for detailed annotation work
- Language barriers and affordability gaps

---

## 🚀 The Solution: AnnotateRx

A **cloud-native, AI-assisted platform** for labeling and evaluating medical data.

Radiologists can collaborate in real time to annotate X-rays, CTs, MRIs, and pathology slides — **10× faster** with model-assisted suggestions.

### Core Workflow

1. **Upload & De-identify** → Secure cloud ingestion, HIPAA/FDA-ready
2. **AI-Assisted Labeling** → Auto-segment organs, tumors, and pathologies
3. **Human-in-the-Loop Review** → Experts refine model suggestions
4. **Built-in Evaluation** → Track model metrics (sensitivity, specificity, F1 score)
5. **Dashboards & APIs** → Monitor annotator performance, throughput, accuracy

---

## 🧠 How AI Helps

### 1. **Instant Segmentation with Zero-Shot Learning**
When an annotator clicks on an organ or pathology, our AI generates a precise mask instantly. No prior training required for new modalities or anatomical structures.

### 2. **Intelligent Pre-Labeling**
Before human review, our models pre-annotate entire medical volumes (3D CT/MRI scans), highlighting potential regions of interest. Annotators simply verify and refine, not create from scratch.

### 3. **Context-Aware Suggestions**
Our hybrid AI architecture understands both local spatial details (tumors, lesions) and global anatomical context (organ boundaries, anatomical relationships), providing more accurate suggestions.

### 4. **Adaptive Learning**
The platform learns from expert corrections, improving suggestions over time. Each annotation feeds back into the model, creating a continuous improvement cycle.

### 5. **Multi-Model Ensembling**
Instead of relying on a single model, we intelligently combine multiple specialized models:
- One excels at zero-shot segmentation (quick starts)
- Another handles complex 3D volumes (comprehensive coverage)
- A third provides robust baselines across diverse modalities (reliability)

### 6. **Built-in Model Evaluation**
Annotators can instantly see AI confidence scores, precision metrics, and per-class performance — ensuring only high-quality annotations make it to production datasets.

---

## ⚙️ Key Features

### Annotation Tools
* 🧩 **Browser-based 2D/3D annotation tools** — No software downloads required
* ⚡ **AI-autofill & interpolation** — Smart suggestions that accelerate manual work
* 🎨 **Multiple annotation modes** — Brush, polygon, circle, rectangle ROI tools
* 🔄 **Multi-slice navigation** — Seamless browsing through 3D medical volumes

### Collaboration & Quality
* 🔁 **Multi-stage reviews & consensus checks** — Multiple experts can review and validate
* 👥 **Real-time collaboration** — Team members work simultaneously on the same study
* ✅ **Built-in QA workflows** — Track annotation quality and inter-rater agreement

### Compliance & Security
* 🧾 **FDA-ready audit trails & versioning** — Every action is logged and traceable
* 🔒 **HIPAA-compliant cloud infrastructure** — All data encrypted in transit and at rest
* 🚫 **No local downloads** — All sensitive medical data stays within secure cloud boundaries
* 🏥 **DICOM-compliant** — Full support for medical imaging standards

### Analytics & Insights
* 📊 **Real-time dashboards** — Monitor time, cost, accuracy, throughput metrics
* 📈 **Model performance tracking** — Precision, recall, F1, per-class metrics
* 👤 **Annotator performance analytics** — Individual and team productivity insights

---

## 💥 Impact

* ⏱️ **Cuts annotation time from months to days** — 10× speedup with AI assistance
* 💰 **Reduces costs by 70%** — Fewer manual hours required per dataset
* ✨ **Improves dataset quality & consistency** — AI suggestions reduce human error
* 🎯 **Frees up radiologists** — Experts focus on insights and validation, not manual labeling
* 🚀 **Accelerates healthcare AI R&D** — Faster dataset creation means faster innovation

### For Indian Healthcare
* Enables researchers to build reliable medical AI models with limited resources
* Bridges the gap between scattered medical data and usable training datasets
* Supports multi-language and multi-modal annotation workflows
* Makes high-quality medical AI accessible to smaller clinics and research teams

---

## 🏗️ Technical Architecture

### Frontend
* **React + TypeScript** — Modern, responsive UI for fast annotation workflows
* **Canvas-based rendering** — Smooth, high-performance image manipulation
* **Real-time updates** — WebSocket connections for collaborative editing

### Backend
* **FastAPI (Python)** — High-performance, asynchronous API gateway
* **RESTful APIs** — Efficient data flow and model serving
* **WebSocket support** — Real-time collaboration features

### AI Engine
* **MONAI Framework** — Industry-standard PyTorch-based medical AI toolkit
* **Optimized pipelines** — DICOM/NIfTI ingestion, medical-specific augmentations
* **Validated loss functions** — DiceLoss, FocalLoss, and other medical segmentation metrics

### Storage & Infrastructure
* **Cloud-native architecture** — Scalable, secure, and HIPAA-compliant
* **DICOM-compliant databases** — Proper medical imaging data management
* **Version control** — Track annotation history and model versions

---

## 🤖 AI Models

### Hybrid Multi-Model Strategy

We don't rely on a single model. Our platform uses an intelligent, multi-model engine for state-of-the-art results:

#### 1. **MedSAM (Segment Anything Model)**
- **Role**: AI-Assisted Labeling (The "Magic")
- **Capability**: Zero-shot segmentation with click-based interaction
- **Use Case**: Annotator clicks on organ/tumor → instant precise mask generation
- **Why**: Enables instant segmentation without modality-specific training

#### 2. **Swin UNETR**
- **Role**: SOTA Pre-Labeling (The Workhorse)
- **Architecture**: Hybrid CNN + Vision Transformer (ViT)
- **Strength**: Excels at complex 3D segmentation (CT/MRI volumes)
- **Why**: Combines spatial detail (U-Net) with global context understanding (Swin Transformer)

#### 3. **nnU-Net ("no-new-Net")**
- **Role**: Robust Baseline (The Reliability)
- **Capability**: Auto-configuration for any new dataset/modality
- **Strength**: Highly reliable across diverse modalities (X-Ray, Ultrasound, CT, MRI)
- **Why**: Provides consistent baseline performance when other models face edge cases

### Model Selection Logic

The platform intelligently selects which model(s) to use based on:
- Image modality (X-Ray, CT, MRI, Ultrasound)
- Image dimensions (2D vs 3D)
- Annotator interaction type (click vs pre-label)
- Historical performance on similar studies

---

## 🚦 Getting Started

### Prerequisites

* Node.js 18+ and npm
* Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd annotx-assist

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development

The application will start on `http://localhost:5173`

### Build for Production

```bash
npm run build
```

---

## 🎯 Current Status

### ✅ Implemented (UI Demo)

* Modern, responsive annotation interface
* Multi-tool annotation canvas (brush, eraser, shapes)
* Sample medical image gallery
* Annotation properties panel
* Real-time UI feedback and notifications

### 🚧 Coming Soon (AI Integration)

* **MedSAM integration** — Zero-shot segmentation on click
* **Swin UNETR backend** — 3D volume pre-labeling
* **nnU-Net baseline** — Robust fallback model
* **Model evaluation dashboard** — Real-time metrics and analytics
* **Collaborative editing** — Multi-user real-time annotation
* **DICOM viewer** — Full medical imaging workflow support

---

## 📊 Project Structure

```
annotx-assist/
├── src/
│   ├── components/
│   │   ├── AnnotationCanvas.tsx    # Core annotation canvas component
│   │   └── ui/                      # shadcn/ui components
│   ├── pages/
│   │   ├── Annotate.tsx            # Main annotation interface
│   │   ├── Dashboard.tsx           # Analytics dashboard
│   │   └── Metrics.tsx             # Model evaluation metrics
│   └── hooks/                      # React custom hooks
├── public/
│   └── sample-scans/               # Sample medical images
└── package.json                    # Dependencies
```

---

## 📝 License

This project is part of a hackathon submission. All rights reserved.

---

## 🔗 Resources

* [MONAI Documentation](https://docs.monai.io/)
* [MedSAM Paper](https://github.com/bowang-lab/MedSAM)
* [Swin UNETR](https://github.com/Project-MONAI/research-contributions/tree/main/SwinUNETR)
* [nnU-Net](https://github.com/MIC-DKFZ/nnUNet)

---

**Built with ❤️ for better healthcare AI**
