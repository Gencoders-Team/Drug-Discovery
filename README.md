🧪 AI-Powered Lead Optimization App

This is a Flask-based web application designed for drug discovery and lead compound optimization, using data from UniProt and ChEMBL. The app retrieves biological target information, fetches lead compounds, calculates physicochemical properties, checks drug-likeness (Lipinski’s Rule), detects toxicophores, and offers suggestions for improving a lead compound.

⸻

🔧 Features
	•	Protein Target Search (via UniProt)
	•	Lead Compound Retrieval (via ChEMBL)
	•	SMILES-to-SDF Conversion with RDKit
	•	Drug-Likeness Evaluation (Lipinski’s Rules)
	•	Solubility & LogP Calculation
	•	Toxicophore Detection
	•	Similarity-Based Lead Optimization Suggestions

⸻

🚀 API Endpoints

GET /api/target

Retrieves UniProt protein target info.

Query Params:
	•	proteinId: UniProt ID (e.g., P00533)
Example:/api/target?proteinId=P00533

GET /api/chembl_leads

Fetches lead compounds with IC50 data from ChEMBL.

Query Params:
	•	proteinId: UniProt ID

Example:/api/chembl_leads?proteinId=P00533

POST /api/optimize

Analyzes the provided lead compound and suggests optimization strategies.

Payload (JSON):
{
  "leadSmiles": "CCOC1=CC=CC=C1C(=O)O",
  "leadIc50": 150.0,
  "allCompounds": [
    {
      "smiles": "...",
      "ic50_value": 120.5
    }
  ]
}

Returns:
	•	Lipinski rule checks
	•	Toxicophores detected
	•	Solubility
	•	Suggestions for improvement
	•	Similar compounds based on molecular fingerprints

📁 Project Structure
 project/
│
├── .env                 # environment variables
├── about.html           # about page
├── admet_data.db        # admet database log
├── requirements.txt     # necessary libraries
└── app.log              # app functioning log
├── app.py               # Main Flask app
├── uploads/             # Stores SDF files
├── index.html           # Static frontend file
├── templates            # frontend files
└── README.md            # You’re here

⚙️ Requirements

Install dependencies:pip install -r requirements.txt

🧠 Example Use Case
	1.	User inputs UniProt ID of interest.
	2.	App retrieves biological function from UniProt.
	3.	App fetches active compounds from ChEMBL using IC50 filter.
	4.	User selects a lead compound.
	5.	App returns:
	•	Physicochemical profile
	•	Lipinski’s rule violations
	•	Toxicophores
	•	Structural optimization suggestions
