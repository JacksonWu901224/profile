# Machine Learning

## 1. prepare data

- split to <font color="blue">train data</font> & <font color="blue">test data</font>

## 2. set a model

- <font color="blue">Simple Linear Regression</font>
  - $y = \beta_0 + \beta_1x + \epsilon$
    - 其中 $\beta_0$ 為截距，$\beta_1$ 為斜率，$\epsilon$ 為隨機誤差。
- <font color="blue">Multiple Linear Regression</font>
  - $y = \beta_0 + \beta_1x_1 + \beta_2x_2 + \dots + \beta_nx_n + \epsilon$
- <font color="blue">Logistic Regression</font>(分類問題/classification)
  - $P(y=1|x) = \frac{1}{1 + e^{-(\beta_0 + \beta_1x_1 + \dots + \beta_nx_n)}}$
  <br>
  ![sigmoid function](Sigmoid-Activation-Function.png)

## 3. set Cost function/Loss function

- Mean Squared Error, MSE
  - $MSE = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2$
    - $n$ : 訓練資料的總數 (Train Data Size / Batch Size).
    - $y_i$ : 第 $i$ 筆資料的真實標籤 (Ground Truth).
    - $\hat{y}_i$ : 模型對第 $i$ 筆資料的預測值 (Prediction)。

## 4. set optimizer

- gradient descent
  - $w_{new} = w_{old} - \eta \cdot \nabla L(w)$
    - $\nabla L(w)$ 代表損失函數 $L$ 在當前參數 $w$ 位置的「斜率」或「坡度」
    - $\eta$ : The Learning Rate
  - accelerate gradient descent
    - Feature Scaling
  ![feature scaling](feature_scaling.webp)

## 5.Train the model

- **<font color="blue">Use gradient descent to train the model, accelerating convergence to the minimum loss and yielding the optimal model(Find the best $\beta_0, \beta_1, \beta_2, \beta_3,...., \epsilon$).</font>**

## 6. use test data to test your model
