import type { NextPage } from "next";
import Layout from "@components/layout";
import Button from "@components/button";
import Input from "@components/Input";

const EditProfile: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="space-y-4 py-3 px-4">
        <div className="flex items-center space-x-3">
          <div className="h-14 w-14 rounded-full bg-slate-400" />
          <label
            htmlFor="picture"
            className="cursor-pointer rounded-md border border-gray-300 py-2 px-3 text-sm font-medium text-gray-700 shadow-sm focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Change photo
            <input
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            ></input>
          </label>
        </div>
        <Input
          required
          name="email"
          label="Email Address"
          type="email"
        />
        <Input
          required
          name="phone"
          label="Phone number"
          kind="phone"
          type="number"
        />
        <Button text="Update profile" />
      </div>
    </Layout>
  );
};

export default EditProfile;
