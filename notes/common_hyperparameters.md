# Neural Network Hyperparameters

## Basic Architecture

| Hyperparameter | Description | Typical Range |
|---|---|---|
| **Number of Layers** | Depth of the network | 2 - 12 |
| **Hidden Units** | Number of neurons in layers | 64, 128, 256, 512, 1024 |
| **Activation Function** | Non-linear function | ReLU, Sigmoid, Tanh, GELU, LeakyReLU |

## Training Parameters

| Hyperparameter | Description | Typical Range |
|---|---|---|
| **Learning Rate (Adam)** | How fast the model updates weights | 1e-5 - 1e-3 |
| **Learning Rate (SGD)** | How fast the model updates weights | 1e-3 - 0.1 |
| **Batch Size** | Number of samples per update | 16, 32, 64, 128, 256, 512 |
| **Epochs** | Number of times through training data | 10 - 100+ |
| **Optimizer** | Algorithm for updating weights | Adam, AdamW, SGD, RMSprop |
| **Gradient Clipping** | Maximum norm for gradient | 1.0 - 5.0 |
| **Gradient Accumulation Steps** | Steps before updating weights | 1 - 8 |

## Regularization

| Hyperparameter | Description | Typical Range |
|---|---|---|
| **Dropout** | Probability of disabling neurons | 0.2 - 0.5 |
| **L2 Regularization (Weight Decay)** | Weight penalty to prevent overfitting | 0.0001 - 0.1 |
| **Batch Normalization** | Normalize layer inputs | On/Off |

## Optimizer Specific

| Hyperparameter | Description | Typical Range |
|---|---|---|
| **Momentum (SGD)** | Acceleration factor | 0.8 - 0.99 |
| **Beta1 (Adam)** | Exponential decay rate for 1st moment | 0.9 |
| **Beta2 (Adam)** | Exponential decay rate for 2nd moment | 0.999 |
| **Epsilon (Adam)** | Numerical stability constant | 1e-8 - 1e-7 |

## Learning Rate Schedule

| Hyperparameter | Description | Typical Range |
|---|---|---|
| **Warmup Steps** | Linear warmup before training | 0 - 10% of total steps |
| **Warmup Strategy** | Type of warmup | Linear, Exponential, Constant |
| **Decay Strategy** | How to reduce LR over time | Step, Exponential, Cosine, Polynomial |
| **Decay Steps** | When to trigger decay | Every N epochs or steps |
| **Cosine Annealing Restarts** | Periodic resets for exploration | 5 - 30 epochs |
| **Final Learning Rate** | Minimum LR at end | 0.1 - 0.01 × initial LR |

## Data Augmentation

| Hyperparameter | Description | Typical Range |
|---|---|---|
| **Mixup Alpha** | Interpolation weight for mixing samples | 0.1 - 1.0 |
| **Cutmix Alpha** | Mixing ratio for regional dropout | 0.1 - 1.0 |
| **CutOut Probability** | Probability of random erasing | 0.2 - 0.5 |
| **Random Rotation** | Maximum rotation angle (degrees) | 5 - 45 |
| **Random Flip** | Horizontal/Vertical flip probability | 0.3 - 0.5 |
| **Color Jitter** | Brightness, contrast, saturation variation | 0.1 - 0.4 |
| **Label Smoothing** | Soft target distribution | 0.01 - 0.2 |

## Advanced Parameters

| Hyperparameter | Description | Typical Range |
|---|---|---|
| **Weight Initialization** | Initialize weights | Xavier, He, Normal |
| **Gradient Clipping** | Limit gradient magnitude | 1.0 - 5.0 |
| **Early Stopping Patience** | Epochs to wait before stopping | 5 - 20 |
| **Validation Split** | Fraction for validation | 0.1 - 0.2 |

## Transformer Specific

| Hyperparameter | Description | Typical Range |
|---|---|---|
| **Number of Heads** | Number of attention heads | 4, 8, 12, 16, 32 |
| **Embedding Dimension** | Dimension of embeddings | 256, 512, 768, 1024, 2048 |
| **Feed-forward Dimension** | Dimension of FFN hidden layer | 2x - 4x embedding dim |
| **Attention Dropout** | Dropout in attention layer | 0.1 - 0.3 |
| **Hidden Dropout** | Dropout in hidden layers | 0.1 - 0.3 |
| **Layer Normalization** | Pre or Post normalization | Pre-LN, Post-LN |
| **Max Sequence Length** | Maximum input sequence | 512, 1024, 2048, 4096 |
| **Position Encoding Type** | Absolute or relative position bias | Absolute, Relative, ALiBi, RoPE |
| **Number of Transformer Blocks** | Depth of transformer | 6 - 48 |

## RNN/LSTM Specific

| Hyperparameter | Description | Typical Range |
|---|---|---|
| **Hidden Units (LSTM)** | Dimension of LSTM hidden state | 64, 128, 256, 512 |
| **Number of LSTM Layers** | Stacking depth | 1 - 4 |
| **Recurrent Dropout** | Dropout on recurrent connections | 0.1 - 0.3 |
| **Zoneout Rate** | Stochastic regularization for recurrent | 0.1 - 0.3 |
| **Gradient Clipping** | Important for RNN stability | 1.0 - 10.0 |
| **Sequence Length** | Maximum input sequence length | 32, 64, 128, 256, 512 |
| **Bidirectional** | Use bidirectional RNN | True/False |

## CNN Specific

| Hyperparameter | Description | Typical Range |
|---|---|---|
| **Number of Filters** | Number of convolutional filters | 32, 64, 128, 256, 512 |
| **Kernel Size** | Size of convolution filter | 3, 5, 7 |
| **Stride** | Step size in convolution | 1, 2 |
| **Dilation (Atrous)** | Spacing between kernel elements | 1, 2, 4, 8 |
| **Padding** | Add zeros around input | Same, Valid |
| **Pooling Type** | Max or Average pooling | Max, Average, AdaptiveAvg |
| **Pooling Size** | Size of pooling window | 2, 3, 4 |
| **Depthwise Separable** | Reduce parameters efficiently | True/False |

## Modern Training Techniques

| Hyperparameter | Description | Typical Range |
|---|---|---|
| **Mixed Precision Training** | Use FP16 for faster training | Enabled/Disabled |
| **Automatic Mixed Precision (AMP)** | Auto-scale loss with FP16 | Enabled/Disabled |
| **Gradient Checkpointing** | Memory-efficient training | Enabled/Disabled |
| **Class Weights** | Balance imbalanced datasets | 1 - 10+ |
| **Focal Loss Alpha** | Focus on hard negatives | 0.25 - 1.0 |
| **Focal Loss Gamma** | Modulation factor | 1.0 - 3.0 |
| **Scheduled Dropout** | Increase dropout over time | Enabled/Disabled |
| **Stochastic Depth** | Skip layers probabilistically | 0.1 - 0.3 |

---

**最重要要調整的參數（依序）：**
1. **Learning Rate** (最關鍵！每個任務和資料集都不同)
2. **Batch Size** (影響收斂和泛化)
3. **Learning Rate Schedule** (warmup + decay 對收斂很重要)
4. **Hidden Units / Model Size** (容量必須足夠)
5. **Dropout & L2 Regularization** (防止過度擬合)
6. **Gradient Clipping** (對 RNN/Transformer 特別重要)
7. **Epochs & Early Stopping Patience** (避免過度訓練)
8. **Data Augmentation** (尤其是小資料集)

**調整技巧：**
- 🎯 **Learning Rate**: 使用 learning rate finder 或 range test 找到最優值
- 📊 **Batch Size**: 越大越穩定但需要更大顯存，通常 32-256
- 🔄 **For Transformers**: 使用 warmup (5-10% steps) + cosine decay
- 🛂 **For RNNs**: 務必做 gradient clipping，重要！
- 📈 **Early Stopping**: 基於驗證集指標，patience 5-20 epochs
