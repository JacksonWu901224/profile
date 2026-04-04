<!-- markdownlint-disable MD033 -->

# AI outline graph

```mermaid
flowchart TD
    subgraph AI ["Artificial Intelligence"]
        direction TB
        subgraph ML ["Machine Learning"]
            direction TB
            subgraph NN ["Neural Networks"]
                direction TB
                subgraph DL ["Deep Learning (Multiple Layers)"]
                    direction TB

                    %% NLP Path
                    subgraph NLP_Domain ["Natural Language Processing (NLP)"]
                        subgraph RNN_Sub ["Recurrent Models"]
                            RNN["RNN"] --引入Gating Unit--> LSTM["LSTM"]
                        end
                        subgraph AB[Attention-Based]
                          TF["Transformer"]
                        end
                    end

                    %% CV Path
                    subgraph CV_Domain ["Computer Vision (CV)"]
                        CNN["CNN (Convolutional)"]
                    end

                    subgraph GenAI ["Generative AI"]
                        direction TB
                        LLM(("Large Language Models"))
                        GAN["GAN (Generative Adversarial Network)"]
                        DM["Diffusion Models"]
                    end
                    
                    %% Connections
                    RNN_Sub -.拋棄了遞歸架構，改用注意力機制.-> TF
                    TF --基礎架構--> LLM
                    TF -.DiT (Diffusion Transformer).-> DM
                    CNN --Spatial Representation Architecture--> GAN
                    CNN -.U-Net Backbone,特徵提取與重建.-> DM
                    AE["Autoencoder"] -.Latent Space Compression,壓縮至潛在空間.-> DM
                end
            end
        end
    end

    %% 註解說明
    Note["註：本圖側重於深度學習演進路徑"]
    Note --- AI

    %% Styles
    style AI fill:#4a90e2,stroke:#003366,color:#fff
    style ML fill:#8db5f8,stroke:#005ce6
    style NN fill:#b3d1ff,stroke:#005ce6
    style DL fill:#dae8fc,stroke:#005ce6
    style GenAI fill:#f5faff,stroke:#005ce6
    style NLP_Domain fill:#e1f5fe,stroke:#01579b,stroke-dasharray: 5 5
    style CV_Domain fill:#f3e5f5,stroke:#4a148c,stroke-dasharray: 5 5
```

# Definition: Generative AI

## 讓computer學會產生<u>複雜</u>而<u>有結構</u>的物件, 就是<font color="blue">Classification</font>, 因為Generative AI就是給一個未完成的句子, 去猜接下來接哪一個token

- 複雜 : 無限可能
- 有結構 : 由有限的<u>基本單位</u>(toekn)所構成
- 基本單位(token) : 
  - 影像 : 是由<font color="blue">像素</font>構成的. 每個像素又由RGB三個子像素組成,而每個子像素的可能值範圍為0-255. 影像只考慮兩個維度: width, height
  - 聲音訊號 : 是由<font color="blue">取樣點</font>構成的. 遠看是聲音訊號,拉進後則可以看到一個一個的取樣點.一秒鐘有多少取樣點,取決於取樣率(sampling rate);比如, 16kHz的取樣率意味著一秒鐘有16000個取樣點. 而每個取樣點有多少種可能的數值,則取決於取樣解析度(bit resolution);常見的16-bit解析度有65,536種可能的數值
  - 影片 : 就是<font color="blue">一連串的圖片</font>, 每一張圖片又叫<font color="blue">Frame</font>. 需考慮三個維度: width, height, time

# Retrieval Augmented Generation(RAG)

# Context Engineering的核心目標

- 避免塞爆Context(把需要的放進去,不需要的清出來)

- 常用招數
  - Select
    - 挑選需要的內容, e.g. RAG, Tool RAG, Memory RAG
  - Compress
  - Multi-Agent

# Machine Learning

![mlthreephases](mlthreephases.png)

## 0. ML三步驟
![mlthreesteps](mlthreesteps.png)
## 1. prepare data

- split data into  
  i. **training data** &ensp;&emsp;&emsp; 98%  
  ii. **validation data** &emsp;&emsp; 1%  
  iii. **public test data** &emsp;0.5%  
  iv. **private test data**&emsp;0.5%

![data spliting](dataspliting.png)

## 2. set a model

- 根據domain knowledge
  - <font color="green">Simple Linear Regression</font>
    - $y = \beta_0 + \beta_1x + \epsilon$
      - 其中 $\beta_0$ 為截距，$\beta_1$ 為斜率，$\epsilon$ 為隨機誤差。
      - **$y, x$** is <font color="blue">feature</font>.**$\beta1$** is <font color="blue">weight</font>.**$\beta0$** is <font color="blue">bias</font>
  - <font color="green">Multiple Linear Regression</font>
    - $y = \beta_0 + \beta_1x_1 + \beta_2x_2 + \dots + \beta_nx_n + \epsilon$
  -  <font color="green">Piecewise Linear Curves</font>
![piecewise linear curves](piecewiselinearcurves.png)
  - <font color="green">Classification</font>
    - <font color="green">Binary Classification</font>(Sigmoid=Logistic Function)
      - $P(y=1|x) = \frac{1}{1 + e^{-(\beta_0 + \beta_1x_1 + \dots + \beta_nx_n)}}$
  <br>
  ![sigmoid function](Sigmoid-Activation-Function.png)
    - <font color="green">Multi-class Classification</font>(Softmax)
  ![softmax](softmax.png)
  - <font color="green">Structured Learning</font>
    - **create** something with structure(e.g. image, document)

### compare regression and classification

![compare regression and classification](compare.png)

- $\sigma$ is called **activation function**
  - Regression
    - $\sigma$ is Relu
  - Classification
    - $\sigma$ is sigmoid/softmax
- $\sigma(\mathbf{b} + \mathbf{W}\mathbf{x})$ is a **<font color="blue">neuron</font>**
- $f(\mathbf{x}) = b + \mathbf{c}^T \sigma(\mathbf{b} + \mathbf{W}\mathbf{x})$ is **<font color="blue">1-Hidden Layer Neural Network</font>**

## 3. set Cost function/Loss function

- Mean Squared Error, MSE
  - $MSE = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2$
    - $n$ : 訓練資料的總數 (Train Data Size / Batch Size).
    - $y_i$ : 第 $i$ 筆資料的真實標籤 (Ground Truth).
    - $\hat{y}_i$ : 模型對第 $i$ 筆資料的預測值 (Prediction)。
- Mean Absolute Error, MAE
  - $MAE = \frac{1}{n} \sum_{i=1}^{n} \left|(y_i - \hat{y}_i)\right|$
    - $n$ : 訓練資料的總數 (Train Data Size / Batch Size).
    - $y_i$ : 第 $i$ 筆資料的真實標籤 (Ground Truth).
    - $\hat{y}_i$ : 模型對第 $i$ 筆資料的預測值 (Prediction)。
- Cross-Entropy(classification)
  - if $y, \hat{y}$ are both probability distributions
  - $ Cross-Entropy=H(y, \hat{y}) = -\sum_{i=1}^{c} y_i \log(\hat{y}_i)$
    - $c$: The total number of classes or categories.
    - **Minimizing cross-entropy** is equivalent to **maximizing likelihood**
    - $y_i$: The probability of the $i$-th class in the true distribution (often a <font color="blue">one-hot encoded</font> vector where only one $y_i = 1$ and others are $0$).
    - $\hat{y}_i$: The probability of the $i$-th class predicted by the model (usually the output of a <font color="blue">Softmax function</font>($0 \le \hat{y}_i \le 1$ and $\sum \hat{y}_i = 1$.)).

## 4. set optimizer

- <font color="green">Gradient Descent(Vanilla Gradient Descent)</font>
  - $ \theta ^ {t+1} = \theta ^ {t} - \eta \cdot \nabla L(\theta ^ {t})$
    - $\nabla L(\theta ^ {t})$ 代表損失函數 $L$ 在當前參數 $\theta ^ {t}$ 位置的「斜率」或「坡度」
    - $\eta$(Eta) : The Learning Rate
  - 問題 : 只根據當下算出來的$g^t$來決定方向
    - 解法 : Gradient Descent + Optimizer
      - 根據$g^0,g^1,g^2,...,g^t$一起來決定方向(調整learning rate)
        - <font color="green">Adagrad</font>
          - for each dimension i : $\eta=\frac{\eta}{\sigma_i^t}$, $\sigma_i^t=\sqrt{\sum_{i=0}^{t} (g_i^t)^2}$
          - 問題 : 每一個維度權重相同 
        - <font color="green">RMSProp</font>
          - 解決Adagrad : 最近算出來的gradient給比較大的影響
          - use $\alpha$
  - 可以用<font color="green"> Momentum </font>(下滑之物體會有動量繼續前行, 不會直接殺停)來繼續找
  global minimum用以脫離saddle point or local minimum
    - for each dimension i : $ \theta ^ {t+1} = \theta ^ {t} - \eta \cdot \color{purple}{m_i^t}$ , $\space$ $\color{purple}{m_i^t}$ = $\color{blue}{g_i^0}$ + $\color{green}{g_i^1}$ + $\color{orange}{g_i^2}$ +...+ $g^t$
  - <font color="green">Adam : RMSProp + Momentum</font>
![adam](adam.png)
  - 也可以用<font color="green">Learning Rate Scheduling</font>來調整learning rate
![Learning Rate Scheduling](learningratescheduling.png)
    - warp up : 給optimizer探索地形的機會, 因為剛進入一個新地圖, 不知道地圖有什麼, 設定一個大的learning rate, 讓參數亂跑, 可以大概知道地圖長什麼樣
  - Feature Scaling(夷平error surface)
  ![feature scaling](featurescaling.png)
    - accelerate gradient descent
  ![feature scaling](feature_scaling.webp)
    - Normalization
      - Batch Normalization
  ![batch normalization](batchnormalization.png)
        - $\gamma$, $\beta$ are another network parameters, 另外再被learned出來的;因為normalization完後,$\tilde{z}^1,\tilde{z}^2,\tilde{z}^3,...$之平均為0, 可能會對模型產生限制,所以加上$\gamma$, $\beta$
        - $\gamma$ initialize to $[1, 1, \dots, 1]^T$
        - $\beta$ initialize to $[0, 0, \dots, 0]^T$
      - Layer Normalization
    - Standardizatoin

## 5.Train the model

- Initialization
  - <font color="green">Kaiming Initialization</font>
- **<font color="blue">Use gradient descent to train the model, accelerating convergence to the minimum loss and yielding the optimal model(Find the best $\beta_0, \beta_1, \beta_2, \beta_3,...., \epsilon$).</font>**

- general guide

![general guide](generalguide.png)

## 6. use validation data to evaluate your model

- be aware of <font color="blue">overfitting</font>

## 7. use test data to test/inference your model

- public test data
  - be aware of <font color="blue">overfitting</font>
- private test data

# Convolutional Neural Networks, CNN

<img src="cnn-1.png" width="50%">

**channel** : R, G, B

![cnn benefit](cnn-2.png)
不需Fully Connected Network, weight太龐大了, 用Receptive Field

鳥嘴可能在任何地方, 所以可以parameters sharing, called **Filter**

## The Whole CNN

![cnn whole picture](cnn-3.png)

**Pooling** :  
e.g. 把奇數rows, columns拿掉, 讓圖變小

<img src="cnn-4.png" width="50%">

**Flatten** :  
把matrix變成column
