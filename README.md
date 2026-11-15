# H3K27M

Educational web app that checks whether a histone H3.3 protein sequence carries the **H3 K27M** mutation.

**Live app:** https://h3k27m.netlify.app

## What it does

Proteins can be written as sequences of letters, one per amino acid. In histone H3.3 (gene *H3-3A*), position 28 is normally a **K** (lysine). When it changes to an **M** (methionine), the protein carries the H3 K27M mutation (official HGVS name: p.Lys28Met), the defining alteration of diffuse midline glioma, H3 K27-altered.

H3K27M compares position 28 of the pasted sequence with a built-in normal human histone H3.3 reference:

- **K** → No H3 K27M detected.
- **M** → H3 K27M detected, with the associated tumor and the targeted treatment ONC201 (dordaviprone).
- **Any other letter** → a message asking to check that the sequence is histone H3.3.

## Try it

Copy one of these sequences, paste it into the app and click **Analyze sequence**.

Normal histone H3.3 (K at position 28):

```
MARTKQTARKSTGGKAPRKQLATKAARKSAPSTGGVKKPHRYRPGTVALREIRRYQKSTELLIRKLPFQRLVREIAQDFKTDLRFQSAAIGALQEASEAYLVGLFEDTNLCAIHAKRVTIMPKDIQLARRIRGERA
```

Mutant histone H3.3 (M at position 28):

```
MARTKQTARKSTGGKAPRKQLATKAARMSAPSTGGVKKPHRYRPGTVALREIRRYQKSTELLIRKLPFQRLVREIAQDFKTDLRFQSAAIGALQEASEAYLVGLFEDTNLCAIHAKRVTIMPKDIQLARRIRGERA
```

The app also accepts FASTA format (a header line starting with `>`), spaces and line breaks.

## Built with

- Plain HTML, CSS and JavaScript (Vite vanilla project). No backend, no external APIs, no AI.
- Screens designed with Google Stitch, tickets managed in Trello and code written with GitHub Copilot, one ticket at a time.
- Versioned with Git and GitHub, and deployed on Netlify with automatic deploys from `main`.

## Run it locally

```
npm install
npm run dev
```

## Limitations

- Educational demo, not for clinical use.
- It only checks histone H3.3 (H3-3A). H3 K27M can also occur in histone H3.1, which is not analyzed.

## Author

Diana Álvarez · Built as part of the M2-05 course at UIC Barcelona.