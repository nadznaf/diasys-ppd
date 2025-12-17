const BASE_URL = "https://diasys-api.duckdns.org";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface LoginData {
  username: string; // email
  password: string;
}

export interface PredictData {
  glucose: number;
  blood_pressure: number;
  weight: number;
  height: number;
  age: number;
  insulin: number;
  skin_thickness: number;
  diabetes_pedigree_function: number;
  pregnancies: number;
}

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

export interface UserData {
  user_id: number;
  name: string;
  email: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: UserData;
  expires_in: {
    access_token: string;
    refresh_token: string;
  };
}

export interface PredictionResult {
  user: {
    name: string;
    email: string;
  };
  prediction: {
    risk_level: string;
    status: string;
    probability: number;
    probability_text: string;
    color_indicator: string;
    advice: string;
  };
  health_metrics: {
    bmi: number;
    bmi_category: string;
    glucose: number;
    blood_pressure: number;
    age: number;
  };
  input_summary: {
    weight: number;
    height: number;
    insulin: number;
    skin_thickness: number;
    diabetes_pedigree: number;
    pregnancies: number;
  };
  model_info: {
    accuracy: number;
    model_type: string;
  };
  disclaimer: string;
  timestamp: string;
}

export const api = {
  async register(data: RegisterData): Promise<ApiResponse<any>> {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Registration failed");
    }

    return response.json();
  },

  async login(data: LoginData): Promise<ApiResponse<LoginResponse>> {
    const formData = new URLSearchParams();
    formData.append("username", data.username);
    formData.append("password", data.password);

    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    return response.json();
  },

  async refreshToken(refreshToken: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${BASE_URL}/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Token refresh failed");
    }

    return response.json();
  },

  async predict(
    data: PredictData,
    accessToken: string
  ): Promise<ApiResponse<PredictionResult>> {
    const response = await fetch(`${BASE_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Prediction failed");
    }

    return response.json();
  },

  async logout(accessToken: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${BASE_URL}/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Logout failed");
    }

    return response.json();
  },
};
