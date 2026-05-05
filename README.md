# Ground-Truth-First Benchmarking of Reinforcement Learning via Converse Optimality

This repository accompanies the paper **“Ground-Truth-First Benchmarking of Reinforcement Learning via Converse Optimality”** and provides the project website, manuscript, figures, and the two experimental code modes used in the benchmark study.

The repository is built around one principle:

> RL benchmarks should not only rank algorithms by return; they should also reveal how far a learned policy is from a certified optimum.

Converse optimality makes this possible by reversing the usual control workflow. Instead of starting from an environment and trying to solve for its optimal policy, the benchmark construction starts from an optimality certificate—an optimal value function and policy—and then generates environments for which that certificate is valid. The result is an oracle-equipped benchmark fixture.

## Benchmark view

Each fixture can be regarded as

```text
B_theta = (S, A, P_theta, c_theta, gamma, V*_theta, pi*_theta, Omega_theta),
```

where `(S, A, P_theta, c_theta, gamma)` is the MDP/control problem exposed to the learner, while `(V*_theta, pi*_theta, Omega_theta)` is the evaluation-side certificate. During training, agents do **not** use the oracle. During evaluation, the oracle supports absolute diagnostics such as:

- optimality gap,
- regret with respect to the certified policy,
- Bellman residual,
- value-function error,
- policy/action error,
- sensitivity to optimizer choice, initialization, simulator choices, and environment-family variation.

This turns the benchmark from a purely relative leaderboard into a calibrated measurement instrument.

## Repository contents

```text
.
├── index.html, styles.css, script.js        # Static project website
├── NeurIPS_Benchmarking_RL.pdf              # Manuscript PDF
├── Benchmark_generation1.png                # Benchmark-generation diagram
├── Benchmark_generation2.png                # Evaluation/generation diagram
├── GFX/                                     # Figures, plots, animations, and CSV assets
├── code mode 1/                             # Mode I: continuous-time sensitivity benchmarks
└── Code mode 2/                             # Mode II: discrete-time oracle-referenced benchmarks
```

## Two benchmark modes

### Mode I — sensitivity and robustness benchmarking

Directory: [`code mode 1/`](<code mode 1/>)

Mode I uses continuous-time converse-optimal generators to sample families of nearby certified control systems. This mode is designed for sensitivity questions: does an algorithmic conclusion remain stable when the environment, optimizer, random initialization, neural-network stochasticity, or simulator interface changes?

Included material:

- generated nonlinear control systems with known certificates,
- PPO optimizer sensitivity study comparing Adam and RAdam,
- stored CSV outputs for the reported 160-run comparison,
- symbolic and numerical N-crank benchmark construction,
- PPO, A2C, SAC, analytic-optimal, and uncontrolled crank-controller evaluations,
- statistical and trajectory-level diagnostic plots.

Mode I is useful when the scientific question is **robustness under benchmark-family variation** rather than a single-task score.

### Mode II — oracle-referenced algorithm comparison

Directory: [`Code mode 2/`](<Code mode 2/>)

Mode II uses native discrete-time benchmark fixtures. The environment, learner, evaluator, and oracle all share the same transition law, avoiding the extra ambiguity introduced by discretizing a continuous-time system with a chosen integration step.

Included material:

- stochastic discrete-time benchmark families with closed-form `V*` and `pi*`,
- Serial Arm / Converse Arm experiments,
- NVDEx / NUDEx nonholonomic-vehicle experiments,
- YAML-driven benchmark and training configurations,
- baseline training and evaluation scripts,
- sanity tests for benchmark construction and oracle interfaces,
- result summaries for optimality gap and regret.

Mode II is useful when the scientific question is **absolute distance to a known optimum** across algorithms and benchmark regimes.

## Empirical summary

The paper and repository illustrate two complementary uses of converse optimality for RL benchmarking:

1. **Sensitivity diagnosis.** Continuous-time generated systems expose optimizer and implementation sensitivity over a distribution of certified environments. The included Mode I study compares PPO with Adam and RAdam over 160 generated tasks.
2. **Oracle-referenced comparison.** Discrete-time fixtures enable direct comparison against `V*` and `pi*`, using optimality gap, regret, Bellman residual, and policy error rather than only realized return.
3. **Interpretable failure modes.** Crank/serial-arm and NVDEx dynamics help distinguish failures caused by nonlinear coupling, delayed actuation, long horizons, insufficient exploration, optimizer variance, or value/policy mismatch.

## Website and resources

The static website summarizes the method, benchmark modes, empirical evidence, diagnostic gallery, and links to the paper and code folders:

- [`index.html`](index.html)
- [`styles.css`](styles.css)
- [`script.js`](script.js)
- [`GFX/`](GFX/)

The manuscript is included as [`NeurIPS_Benchmarking_RL.pdf`](NeurIPS_Benchmarking_RL.pdf).

## Using the benchmark code

Each benchmark mode is self-contained and has its own README with mode-specific dependencies, scripts, and reproduction details:

- [`code mode 1/README.md`](<code mode 1/README.md>) — continuous-time generated systems, optimizer sensitivity, and N-crank experiments.
- [`Code mode 2/README.md`](<Code mode 2/README.md>) — native discrete-time Serial Arm and NVDEx fixtures, oracle interfaces, baseline training, evaluation, and tests.

## Citation

If you use this benchmark suite, website, or paper material, please cite:

```bibtex
@misc{ground_truth_first_rl_benchmarking_2026,
  title  = {Ground-Truth-First Benchmarking of Reinforcement Learning via Converse Optimality},
  author = {Anonymous Author(s)},
  note   = {Submitted to the 40th Conference on Neural Information Processing Systems (NeurIPS 2026)},
  year   = {2026}
}
```

## License

This repository is released under the Apache License 2.0 unless otherwise noted in subdirectories.
