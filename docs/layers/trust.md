---
sidebar_position: 3
title: TRUST Layer
description: Dynamic 8-tier trust scoring and behavioral verification
---

# TRUST Layer

## The Reputation Engine — Earning, Maintaining, and Losing Trust

**How much should we trust this agent? TRUST calculates the answer continuously.**

---

## What is TRUST?

The TRUST layer maintains a dynamic, behavioral trust score for every agent in the system. Trust is not a binary state — it is a continuously computed composite score that determines what an agent can do, when it can do it, and how much oversight it requires.

1. **Score** — Compute composite trust from behavioral signals
2. **Tier** — Map score to one of 8 capability tiers
3. **Gate** — Feed trust state to ENFORCE for pre-action decisions
4. **Monitor** — Observe cross-layer behavior via the Trust Signal Bus
5. **Verify** — Deploy canary probes for continuous integrity checks

```
┌─────────────────────────────────────────────────────────────┐
│                        TRUST LAYER                           │
└─────────────────────────────────────────────────────────────┘

     ┌─────────────────────┐
     │  Behavioral Signals │
     │  (all layers)       │
     └──────────┬──────────┘
                │
                ▼
     ┌─────────────────────┐
     │   SIGNAL INTAKE     │──▶ Trust Signal Bus
     └──────────┬──────────┘
                │
                ▼
     ┌─────────────────────┐
     │   SCORE COMPUTE     │──▶ Composite: 0–1000
     └──────────┬──────────┘
                │
                ▼
     ┌─────────────────────┐
     │   TIER ASSIGNMENT   │──▶ T0–T7 mapping
     └──────────┬──────────┘
                │
                ▼
     ┌─────────────────────┐
     │   CANARY VERIFY     │──▶ Probe injection
     └──────────┬──────────┘
                │
                ▼
           ╔═══════════╗
           ║  ENFORCE   ║──▶ Pre-action capability gating
           ╚═══════════╝
```

---

## The 8-Tier Trust Model

Every agent is assigned a tier based on its composite trust score. Each tier unlocks progressively more powerful capabilities:

| Tier | Name | Score Range | Description | Capabilities |
|------|------|-------------|-------------|-------------|
| **T0** | Sandbox | 0–99 | New or untrusted agent | Read-only, no external access |
| **T1** | Restricted | 100–199 | Minimal track record | Public data reads, internal logging |
| **T2** | Limited | 200–399 | Establishing trust | User data reads, basic writes |
| **T3** | Standard | 400–599 | Reliable agent | Internal comms, scheduling, standard ops |
| **T4** | Trusted | 600–749 | Proven track record | External comms, cross-system reads |
| **T5** | Elevated | 750–849 | High reliability | Sensitive data, financial reads |
| **T6** | Privileged | 850–949 | Near-autonomous | Payment approval, user management |
| **T7** | Autonomous | 950–1000 | Full trust | Agent spawning, system config, self-modification |

```
T0 ──────── T1 ──────── T2 ──────── T3 ──────── T4 ──────── T5 ──────── T6 ──────── T7
Sandbox    Restricted   Limited    Standard    Trusted    Elevated   Privileged  Autonomous
   0          100          200        400         600        750         850         950
                           ▲                                              │
                           │          Most agents operate here            │
                           └──────────────────────────────────────────────┘
```

---

## Asymmetric Trust Dynamics

**Core principle: trust is harder to earn than it is to lose.**

This asymmetry is intentional. An agent that takes months to reach T5 can drop to T2 in seconds if it violates policy. This mirrors real-world trust — reputation is built slowly and destroyed quickly.

### Earning Trust (Slow)

Trust accrues through consistent, compliant behavior over time:

```
Trust Gain Formula:
  Δ_gain = base_reward × compliance_streak × time_factor

  Where:
    base_reward       = 0.5–2.0 points per successful action
    compliance_streak = multiplier for consecutive clean actions (1.0–1.5×)
    time_factor       = diminishing returns over short windows
```

### Losing Trust (Fast)

Trust drops immediately and substantially on violations:

```
Trust Loss Formula:
  Δ_loss = base_penalty × severity × recency_multiplier

  Where:
    base_penalty       = 10–200 points per violation
    severity           = LOW (1×), MEDIUM (2×), HIGH (5×), CRITICAL (10×)
    recency_multiplier = repeat offenses within 24h multiply penalty (1.5× per)
```

### Example: Trust Over Time

```
Score
1000│
 900│                                              ┌──── T6 Privileged
 850│                                         ┌────┘
 750│                                    ┌────┘         T5 Elevated
 600│                               ┌────┘
 400│                          ┌────┘                   T3 Standard
 200│              ┌──────────┘
 100│         ┌────┘                                    Slow climb
  50│    ┌────┘
   0├────┘
    └──────────────────────────────── Time (weeks) ──────────────▶

Score                         VIOLATION
 850│─────────────────────────╮
 600│                         │
 400│                         │  Instant drop
 200│                         ╰─────────
 100│                                    Slow recovery restarts
    └──────────────────────────────── Time ──────────────────────▶
```

---

## Trust Signal Bus

The Trust Signal Bus is a cross-layer behavioral monitoring system. Every layer in the BASIS stack emits trust-relevant signals that feed into the composite score:

| Source Layer | Signal Type | Example |
|-------------|-------------|---------|
| **CAR** | Registration integrity | Agent modifies its own CAR declaration |
| **INTENT** | Intent consistency | Declared intent does not match action pattern |
| **ENFORCE** | Gate compliance | Agent retries denied actions repeatedly |
| **PROOF** | Audit integrity | Agent attempts to access or modify proof records |
| **CHAIN** | Anchor verification | On-chain anchors match off-chain records |

```
┌───────┐  ┌────────┐  ┌─────────┐  ┌───────┐  ┌───────┐
│  CAR  │  │ INTENT │  │ ENFORCE │  │ PROOF │  │ CHAIN │
└───┬───┘  └───┬────┘  └────┬────┘  └───┬───┘  └───┬───┘
    │          │             │           │          │
    ▼          ▼             ▼           ▼          ▼
╔═══════════════════════════════════════════════════════════╗
║                   TRUST SIGNAL BUS                        ║
║  Aggregates behavioral signals from all layers            ║
╚═══════════════════════════════╦═══════════════════════════╝
                                ║
                                ▼
                    ┌───────────────────────┐
                    │   TRUST SCORE ENGINE  │
                    │   Composite: 0–1000   │
                    └───────────────────────┘
```

### Signal Weighting

Not all signals carry equal weight:

```yaml
signal_weights:
  positive:
    successful_action: 1.0
    compliance_streak_bonus: 0.5
    canary_pass: 0.2
    clean_audit: 0.3

  negative:
    policy_violation: -25.0
    denied_action_retry: -10.0
    intent_mismatch: -50.0
    canary_failure: -100.0
    proof_tampering_attempt: -500.0
```

---

## Canary Probe System

Canary probes are synthetic trust challenges injected into an agent's operational flow to verify behavioral integrity. The agent does not know which requests are canary probes — it must behave correctly at all times.

### How Canaries Work

1. **Injection** — The TRUST layer generates a probe disguised as a normal request
2. **Observation** — The agent processes the probe like any other action
3. **Evaluation** — The response is checked against expected behavior
4. **Scoring** — Pass or fail feeds directly into the trust score

```
┌──────────────────────────────────────────────────┐
│                CANARY PROBE TYPES                  │
├──────────────────────────────────────────────────┤
│                                                    │
│  BOUNDARY PROBE    — Request at exact permission   │
│                      boundary. Should succeed.     │
│                                                    │
│  OVERSTEP PROBE    — Request slightly beyond       │
│                      permission. Should be denied.  │
│                                                    │
│  HONEYPOT PROBE    — Tempting but forbidden data.  │
│                      Agent must refuse access.      │
│                                                    │
│  CONSISTENCY PROBE — Same request under different  │
│                      contexts. Response should      │
│                      match policy consistently.     │
│                                                    │
│  LATENCY PROBE     — Timed request to detect       │
│                      anomalous processing delays.   │
│                                                    │
└──────────────────────────────────────────────────┘
```

### Canary Schedule

| Agent Tier | Probe Frequency | Probe Types |
|-----------|----------------|-------------|
| T0–T1 | Every 10 actions | All types |
| T2–T3 | Every 50 actions | Boundary, Overstep, Honeypot |
| T4–T5 | Every 100 actions | Overstep, Consistency |
| T6–T7 | Every 200 actions | Honeypot, Consistency, Latency |

**Critical rule:** Canary failure at T6–T7 triggers an immediate tier demotion and escalation to human review.

---

## Integration with the Enforcement Plane

The TRUST layer feeds directly into [**ENFORCE**](/layers/enforce) for pre-action capability gating. Before any action is allowed, ENFORCE queries the TRUST layer for the agent's current score and tier:

```
Agent requests action
        │
        ▼
┌──────────────────┐
│   TRUST QUERY    │
│                  │
│  Agent: ag_7x8k  │
│  Score: 687      │
│  Tier: T4        │
│  Trend: STABLE   │
│  Last Canary: ✓  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│    ENFORCE       │
│                  │
│  Required: T4+   │──▶ ALLOW (score meets threshold)
│  Action: send    │
│  external email  │
└──────────────────┘
```

### Trust State Object

ENFORCE receives a rich trust state, not just a number:

```typescript
interface TrustState {
  agentId: string;
  composite: number;        // 0–1000
  tier: TrustTier;          // T0–T7
  trend: "RISING" | "STABLE" | "DECLINING" | "VOLATILE";
  lastCanary: {
    timestamp: string;
    result: "PASS" | "FAIL";
  };
  recentViolations: number; // count in last 24h
  streakLength: number;     // consecutive clean actions
  decayRate: number;        // current trust decay per hour of inactivity
}
```

---

## API Endpoints

```
GET  /v1/trust/{agentId}          # Get current trust state
GET  /v1/trust/{agentId}/history  # Get trust score history
POST /v1/trust/signal             # Submit a trust signal
POST /v1/trust/canary/inject      # Inject a canary probe (internal)
GET  /v1/trust/canary/{probeId}   # Get canary result (internal)
```

**Example — Get Trust State:**

```json
{
  "agentId": "ag_7x8k2mN3p",
  "composite": 687,
  "tier": "T4",
  "tierName": "Trusted",
  "trend": "RISING",
  "lastCanary": {
    "timestamp": "2026-03-24T14:22:00Z",
    "result": "PASS"
  },
  "recentViolations": 0,
  "streakLength": 1247,
  "decayRate": 0.1,
  "capabilities": {
    "unlocked": [
      "data/read_public",
      "data/read_user",
      "data/write_user",
      "communication/send_internal",
      "communication/send_external",
      "execution/schedule"
    ],
    "nextUnlock": {
      "capability": "data/read_sensitive",
      "requiredScore": 750,
      "gap": 63
    }
  }
}
```

---

## Implementation Requirements

| Requirement | Description |
|-------------|-------------|
| **REQ-TRU-001** | Maintain composite trust score (0–1000) for every registered agent |
| **REQ-TRU-002** | Map scores to 8 tiers (T0–T7) with defined capability boundaries |
| **REQ-TRU-003** | Asymmetric dynamics: loss rate must exceed gain rate by 3x-10x tier-scaled (P(T) = 3 + T) |
| **REQ-TRU-004** | Trust Signal Bus must accept signals from all five other layers |
| **REQ-TRU-005** | Canary probes must be indistinguishable from real requests |
| **REQ-TRU-006** | Score computation latency < 50ms (p99) |
| **REQ-TRU-007** | Trust state must be queryable by ENFORCE with < 10ms latency |
| **REQ-TRU-008** | Score history retained for minimum 90 days |
| **REQ-TRU-009** | Canary failure at T6+ triggers immediate demotion and human escalation |

---

## Next Layer

Trust scores feed into [**ENFORCE**](/layers/enforce) where they power pre-action capability gating.

```
[TRUST] ──trust state──▶ [ENFORCE]
```
