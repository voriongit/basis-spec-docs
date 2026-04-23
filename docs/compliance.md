---
sidebar_position: 7
title: Compliance
description: Regulatory alignment and compliance testing for BASIS implementations
---

# Compliance

BASIS provides comprehensive compliance support across major regulatory frameworks and includes automated testing to validate conformance.

---

## Regulatory Alignment

BASIS maps directly to the requirements of key AI governance frameworks:

| Framework | Coverage | Details |
|-----------|----------|---------|
| **EU AI Act** | Articles 9, 13, 14, 17 | Risk classification, transparency, human oversight, quality management |
| **NIST AI RMF** | MAP, MEASURE, MANAGE, GOVERN | Trust scoring, audit logging, policy enforcement, governance structure |
| **ISO 42001** | Full AIMS alignment | AI management system controls mapped to BASIS layers |
| **SOC 2** | Trust Services Criteria | Security, availability, processing integrity via PROOF layer |
| **HIPAA** | Security & Privacy Rules | Access controls, audit trails, minimum necessary enforcement |
| **FedRAMP** | FIPS 199 tiers | Graduated trust mapped to federal security impact levels |

→ [Full regulatory compliance mapping](/spec/regulatory-compliance)

---

## Compliance Testing

The BASIS compliance test suite validates your implementation against the specification automatically.

```bash
npm install -g @basis-protocol/compliance-tests
basis-test --target http://localhost:8000
```

Test coverage spans all five stages:

| Stage | Tests | What's Validated |
|-------|-------|------------------|
| **CAR** | 10 | Capability detection, risk classification |
| **INTENT** | 12 | Intent ID generation, schema compliance |
| **ENFORCE** | 18 | Trust verification, policy evaluation, rate limiting |
| **PROOF** | 15 | Record creation, hash chaining, receipt verification |
| **CHAIN** | 8 | Blockchain anchoring, independent verification |

→ [Full compliance test documentation](/implement/compliance-tests)

---

## Compliance Levels

Three levels of compliance certification determine the extent of governance enforcement:

| Level | Requirements | Use Case |
|-------|-------------|----------|
| **Level 1 — Core** | INTENT + ENFORCE stages | Internal tools, low-risk agents |
| **Level 2 — Standard** | All five stages | Production deployments, customer-facing agents |
| **Level 3 — Enterprise** | Full stack + external audit | Regulated industries, government, healthcare |

---

## Getting Compliant

1. **Assess** — Run the compliance test suite against your agent deployment
2. **Map** — Review [regulatory mappings](/spec/regulatory-compliance) for your jurisdiction
3. **Implement** — Follow the [getting started guide](/implement/getting-started) for missing layers
4. **Certify** — Complete [certification](/implement/certification) for production readiness
5. **Audit** — Maintain continuous compliance via PROOF layer audit trails

---

## Resources

- [Regulatory Compliance Mapping](/spec/regulatory-compliance) — EU AI Act, NIST AI RMF, ISO 42001
- [Compliance Tests](/implement/compliance-tests) — Automated validation suite
- [Certification Guide](/implement/certification) — Path to production certification
- [NIST CAISI RFI Response](https://github.com/vorionsys/vorion/blob/main/docs/nist-caisi-rfi-response-2026-02.md) — Our federal policy submission
- [Compliance Docs on GitHub](https://github.com/vorionsys/vorion/tree/main/docs/compliance) — Test traceability matrices, mappings
