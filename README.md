# Benchmarking of Reinforcement Learning via Converse Optimality

This repository accompanies the paper **“Ground-Truth-First Benchmarking of Reinforcement Learning via Converse Optimality”**.

The central idea is to make reinforcement-learning benchmarks *informative by construction*: instead of evaluating agents only by relative return on tasks whose true optimum is unknown, the benchmark generator constructs environments together with a certified optimal value function and optimal policy. This gives every benchmark instance a hidden oracle that can be used after training to measure how far an algorithm is from ground truth.

## Core idea

Most RL benchmarks can rank algorithms, but they often cannot say whether the best-ranked policy is close to optimal. Converse optimality reverses the usual workflow:

> Choose or parameterize an optimal certificate first, then generate systems for which that certificate is provably optimal.

Each released benchmark fixture can be viewed as an oracle-equipped MDP/control problem,

```text
B_theta = (S, A, P_theta, c_theta, gamma, V*_theta, pi*_theta, Omega_theta),
```

where the learner interacts only with the environment during training, while evaluation can use the certified pair `(V*, pi*)` to compute absolute diagnostic quantities such as:

- optimality gap,
- regret relative to the oracle,
- Bellman residual,
- value-function error,
- policy/action error,
- sensitivity to optimizer, simulator, initialization, and generated environment parameters.

## What is included

The repository contains the paper website, figures, manuscript PDF, and two code modes corresponding to the two benchmark modes studied in the paper.

```text
.
├── index.html, styles.css, script.js        # Static project website
├── NeurIPS_Benchmarking_RL.pdf              # Manuscript PDF
├── Benchmark_generation1.png                # Benchmark-generation diagram
├── Benchmark_generation2.png                # Evaluation/generation diagram
├── GFX/                                     # Website figures, plots, animations, CSVs
├── code mode 1/                             # Mode I: continuous-time/sensitivity benchmarks
└── Code mode 2/                             # Mode II: discrete-time/oracle-referenced benchmarks
```

## Benchmark modes

### Mode I — sensitivity and robustness benchmarking

Directory: [`code mode 1/`](<code mode 1/>)

Mode I studies benchmark families generated from continuous-time converse-optimal constructions. It is designed for sensitivity questions: how conclusions change under nearby systems, optimizer choices, neural-network stochasticity, and simulator or integration choices.

This mode includes:

- a generated family of certified nonlinear control systems,
- an Adam vs. RAdam PPO sensitivity study,
- stored CSVs for the reported 160-run comparison,
- symbolic/numeric N-crank benchmark components,
- trained/evaluated crank-controller examples comparing PPO, A2C, SAC, the analytic optimum, and the uncontrolled system.

Representative outputs include variance-ratio tests, box/KDE plots of final reward or suboptimality, and trajectory-level diagnostics against an analytic optimal policy.

### Mode II — oracle-referenced algorithm comparison

Directory: [`Code mode 2/`](<Code mode 2/>)

Mode II uses native discrete-time benchmark fixtures so that the learner, evaluator, and oracle share exactly the same transition law. This avoids ambiguity from continuous-time discretization when computing absolute optimality metrics.

This mode includes:

- oracle-equipped benchmark families with closed-form `V*` and `pi*`,
- Serial Arm / Converse Arm experiments,
- NVDEx / NUDEx nonholonomic vehicle experiments,
- YAML-driven experiment configurations,
- baseline training and evaluation scripts,
- sanity tests for benchmark construction and oracle interfaces,
- result summaries for optimality gap and regret.

The Mode II material supports oracle-referenced comparison of RL algorithms using common metrics such as optimality gap, regret, Bellman residual, and policy error.

## Website

The project website is included as a dependency-free static site:

- [`index.html`](index.html)
- [`styles.css`](styles.css)
- [`script.js`](script.js)
- [`GFX/`](GFX/)

It summarizes the paper, the two benchmark modes, empirical evidence, diagnostic figures, and links to the manuscript and code folders.

## Main result summary

The repository material illustrates two complementary uses of converse optimality for RL benchmarking:

1. **Sensitivity diagnosis.** Mode I shows how generated families with known certificates can expose optimizer and implementation sensitivity rather than reporting only aggregate return.
2. **Absolute algorithm comparison.** Mode II uses discrete-time oracle-equipped fixtures to compare learned policies against the true optimum, not merely against other baselines.
3. **Interpretable failure modes.** Serial-arm/crank and NVDEx dynamics make it possible to diagnose whether a learner fails because of delayed actuation, nonlinear coupling, insufficient exploration, optimizer variance, or value/policy mismatch.

## Using the code

Each benchmark mode has its own README with mode-specific dependencies, scripts, and reproduction commands:

- [`code mode 1/README.md`](<code mode 1/README.md>) — continuous-time generated benchmarks, optimizer sensitivity, and N-crank experiments.
- [`Code mode 2/README.md`](<Code mode 2/README.md>) — native discrete-time Serial Arm and NVDEx benchmark families, training scripts, evaluation, and tests.

The top-level repository is intentionally organized so the website and both experimental code modes can be inspected independently.

## Citation

If you use this benchmark suite or website, please cite the paper:

```bibtex
@misc{ground_truth_first_rl_benchmarking_2026,
  title  = {Ground-Truth-First Benchmarking of Reinforcement Learning via Converse Optimality},
  author = {Anonymous Author(s)},
  note   = {Submitted to the 40th Conference on Neural Information Processing Systems (NeurIPS 2026)},
  year   = {2026}
}
```

## License

The repository is released under the Apache License 2.0 unless otherwise noted in subdirectories.
